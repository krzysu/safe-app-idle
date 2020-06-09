import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form, { FORM_DEPOSIT } from "../components/Form";
import { getIdleTokenId, parseUnits } from "../utils";

const Deposit = ({ state, appsSdk, onBackClick }) => {
  const handleDeposit = ({ tokenId, strategyId, amount }) => {
    const erc20 = state.tokens[tokenId];
    const idle = state.tokens[getIdleTokenId(strategyId, tokenId)];
    const amountWei = parseUnits(amount.toString(), erc20.decimals);

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
