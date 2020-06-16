import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form from "../components/Form";
import { getIdleTokenId } from "../utils";
import { FORM_DEPOSIT } from "../const";

const Deposit = ({ state, appsSdk, onBackClick }) => {
  const handleDeposit = ({ tokenId, strategyId, amountWei }) => {
    const { underlying, idle } = state.tokens[
      getIdleTokenId(strategyId, tokenId)
    ];

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
