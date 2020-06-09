import React, { useState, useEffect } from "react";
import { Button, Text, TextField } from "@gnosis.pm/safe-react-components";
import TokenSelect from "./TokenSelect";
import StrategySelect from "./StrategySelect";
import {
  getIdleTokenId,
  balanceToFloat,
  formatToken,
  formatAPR,
  formatDepositBalance,
} from "../utils";

import styles from "./Form.module.css";

export const FORM_DEPOSIT = "FORM_DEPOSIT";
export const FORM_WITHDRAW = "FORM_WITHDRAW";

const buttonLabels = {
  [FORM_DEPOSIT]: "Deposit",
  [FORM_WITHDRAW]: "Withdraw",
};

const getFormTokenBalance = (formToken, formType) => {
  if (formType === FORM_DEPOSIT) {
    return `Balance: ${formatToken(formToken.underlying)}`;
  }

  if (formType === FORM_WITHDRAW) {
    return `Deposit balance: ${formatDepositBalance(formToken)}`;
  }
};

const Form = ({ state, onSubmit, onBackClick, formType }) => {
  const [tokenId, setTokenId] = useState(state.currentTokenId);
  const [strategyId, setStrategyId] = useState(state.currentStrategyId);
  const [amount, setAmount] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [formToken, setFormToken] = useState(
    state.tokens[getIdleTokenId(strategyId, tokenId)]
  );

  useEffect(() => {
    setFormToken(state.tokens[getIdleTokenId(strategyId, tokenId)]);
  }, [tokenId, strategyId]);

  // TODO figure out how to set amount in underlying for deposit and depositBalance for withdraw

  // useEffect(() => {
  //   const maxAmount = balanceToFloat(formToken.underlying);

  //   if (amount !== "" && amount <= maxAmount && amount > 0) {
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  // }, [amount, formToken]);

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
          <Text size="lg">{`APR: ${formatAPR(formToken.avgAPR)}`}</Text>
        </label>
        <TokenSelect value={tokenId} onChange={setTokenId} />
      </div>
      <div className={styles.amount}>
        <label className={styles.amountLabel}>
          <Text size="lg">
            {getFormTokenBalance(formToken, formType, tokenId)}
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
              onClick={() =>
                setAmount(balanceToFloat(formToken, { divideBy: 4 }))
              }
            >
              <Text size="md">25%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() =>
                setAmount(balanceToFloat(formToken, { divideBy: 2 }))
              }
            >
              <Text size="md">50%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() =>
                setAmount(
                  balanceToFloat(formToken, { divideBy: 4, multiBy: 3 })
                )
              }
            >
              <Text size="md">75%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() => setAmount(balanceToFloat(formToken))}
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
        disabled={!isValid}
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
