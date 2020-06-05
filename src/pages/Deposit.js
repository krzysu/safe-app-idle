import React, { useState } from "react";
import {
  Button,
  Text,
  TextField,
  Title,
} from "@gnosis.pm/safe-react-components";
import TokenSelect from "../components/TokenSelect";
import StrategySelect from "../components/StrategySelect";
import { parseUnits, formatToken, formatAPR, getIdleTokenId } from "../utils";

import styles from "./Deposit.module.css";

const Deposit = ({ state, onBackClick }) => {
  const [tokenId, setTokenId] = useState(state.currentTokenId);
  const [strategyId, setStrategyId] = useState(state.currentStrategyId);
  const [amount, setAmount] = useState("");

  const handleDeposit = (erc20, idle, amount) => () => {
    const amountWei = parseUnits(amount, erc20.decimals);

    // deposit 1 DAI for now
    const txs = [
      {
        to: erc20.contract.address,
        value: 0,
        data: erc20.contract.interface.functions.approve.encode([
          idle.contract.address,
          amountWei,
        ]),
      },
      {
        to: idle.contract.address,
        value: 0,
        data: idle.contract.interface.functions.mintIdleToken.encode([
          amountWei,
          true,
        ]),
      },
    ];

    // appsSdk.sendTransactions(txs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Title size="xs">Deposit</Title>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>
            <Text size="lg">Strategy</Text>
          </label>
          <StrategySelect value={strategyId} onChange={setStrategyId} />
        </div>
        <div>
          <label>
            <Text size="lg">APR</Text>
          </label>
          <div className={styles.apr}>
            <Text size="xl">
              {formatAPR(
                state.tokens[getIdleTokenId(tokenId, strategyId)].avgAPR
              )}
            </Text>
          </div>
        </div>
        <div>
          <label>
            <Text size="lg">Asset</Text>
          </label>
          <TokenSelect value={tokenId} onChange={setTokenId} />
        </div>
        <div>
          <label className={styles.amount}>
            <Text size="lg">Balance: {formatToken(state.tokens[tokenId])}</Text>
          </label>
          <div>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className={styles.split}>
              <button
                className={styles.link}
                type="button"
                onClick={() => setAmount(25)}
              >
                <Text size="md">25%</Text>
              </button>
              <button
                className={styles.link}
                type="button"
                onClick={() => setAmount(50)}
              >
                <Text size="md">50%</Text>
              </button>
              <button
                className={styles.link}
                type="button"
                onClick={() => setAmount(75)}
              >
                <Text size="md">75%</Text>
              </button>
              <button
                className={styles.link}
                type="button"
                onClick={() => setAmount(100)}
              >
                <Text size="md">MAX</Text>
              </button>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          color="primary"
          variant="contained"
          type="submit"
          disabled
          className={styles.button}
        >
          Deposit
        </Button>

        <Button
          size="md"
          color="secondary"
          type="button"
          className={styles.button}
          onClick={onBackClick}
        >
          Cancel and go back
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Deposit;
