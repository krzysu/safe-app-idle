import React from "react";
import {
  Button,
  Text,
  TextField,
  Title,
} from "@gnosis.pm/safe-react-components";
import TokenSelect from "../components/TokenSelect";
import StrategySelect from "../components/StrategySelect";
import { parseUnits } from "../utils";

import styles from "./Deposit.module.css";

const Deposit = ({ state, onBackClick }) => {
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

  return (
    <React.Fragment>
      <Title size="xs">Deposit</Title>

      <form onSubmit={() => {}}>
        <div className={styles.row}>
          <div>
            <label>
              <Text size="lg">Strategy</Text>
            </label>
            <StrategySelect />
          </div>
          <div>
            <label>
              <Text size="lg">APR</Text>
            </label>
            <div>
              <Text size="xl">3.0%</Text>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <label>
              <Text size="lg">Asset</Text>
            </label>
            <TokenSelect />
          </div>
          <div>
            <label>
              <Text size="lg">Amount</Text>
            </label>
            <div>
              <TextField label="Amount" defaultValue="" />
              <Text size="md">Balance: 123 DAI</Text>
              <a href="#">
                <Text size="md">MAX</Text>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <Button
            size="lg"
            color="primary"
            variant="contained"
            type="submit"
            disabled
          >
            Deposit
          </Button>
        </div>
      </form>

      <Button
        size="md"
        color="primary"
        variant="contained"
        onClick={onBackClick}
      >
        Back
      </Button>
    </React.Fragment>
  );
};

export default Deposit;
