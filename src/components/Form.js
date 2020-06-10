import React, { useState, useEffect } from "react";
import { Button, Text, TextField } from "@gnosis.pm/safe-react-components";
import TokenSelect from "./TokenSelect";
import StrategySelect from "./StrategySelect";
import {
  balanceToFloat,
  depositBalanceToFloat,
  getIdleTokenId,
  formatToken,
  formatAPR,
  formatDepositBalance,
  parseUnits,
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

const calculateMaxAmount = (formType, formToken) => {
  if (formType === FORM_DEPOSIT) {
    return balanceToFloat(formToken.underlying);
  }

  if (formType === FORM_WITHDRAW) {
    return depositBalanceToFloat(formToken);
  }
};

const calculateRealAmountWei = (formType, formToken, amount) => {
  if (formType === FORM_DEPOSIT) {
    return parseUnits(amount.toString(), formToken.underlying.decimals);
  }

  if (formType === FORM_WITHDRAW) {
    // return idle balance in wei
    // divide amount by price
    return "";
  }
};

const roundToDecimals = (number, decimals) =>
  parseFloat(number.toFixed(decimals));

const Form = ({ state, onSubmit, onBackClick, updateTokenPrice, formType }) => {
  const [tokenId, setTokenId] = useState(state.currentTokenId);
  const [strategyId, setStrategyId] = useState(state.currentStrategyId);
  const [amount, setAmount] = useState(""); // user friendly amount always in underlying token
  const [realAmountWei, setRealAmountWei] = useState(""); // when withdraw -> amount of idle tokens; when deposit -> amount of underlying tokens
  const [isValid, setIsValid] = useState(false);

  const { tokens } = state;

  const [formToken, setFormToken] = useState(
    tokens[getIdleTokenId(strategyId, tokenId)]
  );
  const [maxAmount, setMaxAmount] = useState(
    calculateMaxAmount(formType, formToken)
  );

  // update the token this form currently operates on, based on strategy and token dropdowns
  useEffect(() => {
    const newFormToken = tokens[getIdleTokenId(strategyId, tokenId)];
    setFormToken(newFormToken);
    setMaxAmount(calculateMaxAmount(formType, newFormToken));
    setAmount("");
  }, [formType, tokens, tokenId, strategyId]);

  // update price on withdraw form
  useEffect(() => {
    if (updateTokenPrice && typeof updateTokenPrice === "function") {
      updateTokenPrice(strategyId, tokenId);
    }
  }, [strategyId, tokenId]); // cannot add updateTokenPrice as it changes every time the price updates causing infinite rerender loop

  // simple form validation
  useEffect(() => {
    if (amount !== "" && amount <= maxAmount && amount > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [amount, maxAmount]);

  // update realAmountWei when amount change
  useEffect(() => {
    if (amount !== "" && !isNaN(amount)) {
      setRealAmountWei(calculateRealAmountWei(formType, formToken, amount));
    } else {
      setRealAmountWei("");
    }
  }, [formType, formToken, amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ tokenId, strategyId, amountWei: realAmountWei });
  };

  console.log("render", { realAmountWei, amount });

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
            onChange={(e) => {
              if (e.target.value !== "") {
                setAmount(
                  roundToDecimals(
                    parseFloat(e.target.value),
                    formToken.underlying.decimals
                  )
                );
              } else {
                setAmount("");
              }
            }}
          />
          <div className={styles.split}>
            <button
              className={styles.link}
              type="button"
              onClick={() =>
                setAmount(
                  roundToDecimals(maxAmount / 4, formToken.underlying.decimals)
                )
              }
            >
              <Text size="md">25%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() =>
                setAmount(
                  roundToDecimals(maxAmount / 2, formToken.underlying.decimals)
                )
              }
            >
              <Text size="md">50%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() =>
                setAmount(
                  roundToDecimals(
                    (maxAmount * 3) / 4,
                    formToken.underlying.decimals
                  )
                )
              }
            >
              <Text size="md">75%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() => setAmount(maxAmount)}
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
