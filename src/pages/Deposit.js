import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form, { FORM_DEPOSIT } from "../components/Form";
import { getIdleTokenId, formatToken } from "../utils";

const Deposit = ({ state, appsSdk, onBackClick }) => {
  const handleDeposit = ({ tokenId, strategyId, amountWei }) => {
    const { underlying, idle } = state.tokens[
      getIdleTokenId(strategyId, tokenId)
    ];

    console.log("DEPOSIT", {
      tokenId,
      strategyId,
      amountWei: formatToken(
        {
          balance: amountWei,
          decimals: underlying.decimals,
        },
        { precision: 18 }
      ),
      amountMax: formatToken(underlying, { precision: 18 }),
    });

    const txs = [
      {
        to: underlying.contract.address,
        value: 0,
        data: underlying.contract.interface.functions.approve.encode([
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

    appsSdk.sendTransactions(txs);
  };

  return (
    <React.Fragment>
      <Title size="xs">Deposit</Title>
      <Form
        state={state}
        onSubmit={handleDeposit}
        onBackClick={onBackClick}
        formType={FORM_DEPOSIT}
      />
    </React.Fragment>
  );
};

export default Deposit;
