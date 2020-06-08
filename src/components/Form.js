import React, { useState } from "react";
import { Button, Text, TextField } from "@gnosis.pm/safe-react-components";
import TokenSelect from "./TokenSelect";
import StrategySelect from "./StrategySelect";
import { formatToken, formatAPR, getIdleTokenId } from "../utils";

import styles from "./Form.module.css";

export const FORM_DEPOSIT = "FORM_DEPOSIT";
export const FORM_WITHDRAW = "FORM_WITHDRAW";

const buttonLabels = {
  [FORM_DEPOSIT]: "Deposit",
  [FORM_WITHDRAW]: "Withdraw",
};

const getFormTokenBalance = (state, formType, tokenId, strategyId) => {
  if (formType === FORM_DEPOSIT) {
    return `Balance: ${formatToken(state.tokens[tokenId])}`;
  }

  if (formType === FORM_WITHDRAW) {
    return `Deposit balance: ${formatToken(
      state.tokens[getIdleTokenId(tokenId, strategyId)],
      { withSymbol: false }
    )} ${tokenId.toUpperCase()}`;
  }
};

const Form = ({ state, onSubmit, onBackClick, formType }) => {
  const [tokenId, setTokenId] = useState(state.currentTokenId);
  const [strategyId, setStrategyId] = useState(state.currentStrategyId);
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ tokenId, strategyId, amount });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>
          <Text size="lg">Strategy</Text>
        </label>
        <StrategySelect value={strategyId} onChange={setStrategyId} />
      </div>
      <div>
        <label className={styles.assetLabel}>
          <Text size="lg">Asset</Text>
          <Text size="lg">
            {`APR: ${formatAPR(
              state.tokens[getIdleTokenId(tokenId, strategyId)].avgAPR
            )}`}
          </Text>
        </label>
        <TokenSelect value={tokenId} onChange={setTokenId} />
      </div>
      <div className={styles.amount}>
        <label className={styles.amountLabel}>
          <Text size="lg">
            {getFormTokenBalance(state, formType, tokenId, strategyId)}
          </Text>
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
        className={styles.button}
        disabled
      >
        {buttonLabels[formType]}
      </Button>

      <Button
        size="md"
        color="secondary"
        type="button"
        className={styles.button}
        onClick={onBackClick}
      >
        Cancel
      </Button>
    </form>
  );
};

export default Form;
