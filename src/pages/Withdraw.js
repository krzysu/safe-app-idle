import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form, { FORM_WITHDRAW } from "../components/Form";
import { getIdleTokenId } from "../utils";

const Withdraw = ({ state, appsSdk, onBackClick }) => {
  const handleWithdraw = ({ tokenId, strategyId, amount }) => {
    const idle = state.tokens[getIdleTokenId(tokenId, strategyId)];

    // TODO calculate amount of idle tokens from amount of erc20 to redeem

    // withdraw everything for now
    const txs = [
      {
        to: idle.contract.address,
        value: 0,
        data: idle.contract.interface.functions.redeemIdleToken.encode([
          idle.balance,
          true,
          [],
        ]),
      },
    ];

    appsSdk.sendTransactions(txs);
  };

  return (
    <React.Fragment>
      <Title size="xs">Withdraw</Title>

      <Form
        state={state}
        onSubmit={handleWithdraw}
        onBackClick={onBackClick}
        formType={FORM_WITHDRAW}
      />
    </React.Fragment>
  );
};

export default Withdraw;
