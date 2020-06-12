import React, { useState, useEffect } from "react";
import { Button, Text, TextField } from "@gnosis.pm/safe-react-components";
import TokenSelect from "./TokenSelect";
import StrategySelect from "./StrategySelect";
import {
  BNify,
  calculateMaxAmountBN,
  calculateRealAmountWei,
  getIdleTokenId,
  formatToken,
  formatAPR,
  formatDepositBalance,
} from "../utils";
import { FORM_DEPOSIT, FORM_WITHDRAW } from "../const";

import styles from "./Form.module.css";

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

const Form = ({ state, onSubmit, onBackClick, updateTokenPrice, formType }) => {
  const { tokens } = state;

  const [tokenId, setTokenId] = useState(state.currentTokenId);
  const [strategyId, setStrategyId] = useState(state.currentStrategyId);
  const [amountBN, setAmountBN] = useState(BNify(0)); // user friendly amount always in underlying token
  const [isValid, setIsValid] = useState(false);
  const [formToken, setFormToken] = useState(
    tokens[getIdleTokenId(strategyId, tokenId)]
  );
  const [maxAmountBN, setMaxAmountBN] = useState(
    calculateMaxAmountBN(formType, formToken)
  );
  // when withdraw -> amount of idle tokens; when deposit -> amount of underlying tokens
  const [realAmountWei, setRealAmountWei] = useState(
    calculateRealAmountWei(formType, formToken, amountBN)
  );

  // update the token which form currently operates on, based on strategy and token dropdowns
  useEffect(() => {
    const newFormToken = tokens[getIdleTokenId(strategyId, tokenId)];
    setFormToken(newFormToken);
    setMaxAmountBN(calculateMaxAmountBN(formType, newFormToken));
    setAmountBN(BNify(0));
  }, [formType, tokens, tokenId, strategyId]);

  // update price on withdraw form to show actual deposit balance
  useEffect(() => {
    if (updateTokenPrice && typeof updateTokenPrice === "function") {
      updateTokenPrice(strategyId, tokenId);
    }
  }, [strategyId, tokenId]); // cannot add updateTokenPrice as it changes every time the price updates causing infinite rerender loop

  // simple form validation
  useEffect(() => {
    if (amountBN.gt(0) && amountBN.lte(maxAmountBN)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [amountBN, maxAmountBN]);

  // update realAmountWei when amountBN change
  useEffect(() => {
    setRealAmountWei(calculateRealAmountWei(formType, formToken, amountBN));
  }, [formType, formToken, amountBN]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ tokenId, strategyId, amountWei: realAmountWei });
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
            placeholder="0.0"
            value={amountBN.toFixed()}
            onChange={(e) => setAmountBN(BNify(e.target.value || 0))}
          />
          <div className={styles.split}>
            <button
              className={styles.link}
              type="button"
              onClick={() => setAmountBN(maxAmountBN.div(4))}
            >
              <Text size="md">25%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() => setAmountBN(maxAmountBN.div(2))}
            >
              <Text size="md">50%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() => setAmountBN(maxAmountBN.times(3).div(4))}
            >
              <Text size="md">75%</Text>
            </button>
            <button
              className={styles.link}
              type="button"
              onClick={() => setAmountBN(maxAmountBN)}
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
