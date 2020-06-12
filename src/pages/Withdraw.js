import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form from "../components/Form";
import { getIdleTokenId } from "../utils";
import { FORM_WITHDRAW } from "../const";

const Withdraw = ({ state, appsSdk, onBackClick, updateTokenPrice }) => {
  const handleWithdraw = ({ tokenId, strategyId, amountWei }) => {
    const { idle } = state.tokens[getIdleTokenId(strategyId, tokenId)];

    console.log("WITHDRAW", {
      tokenId,
      strategyId,
      amountWei,
      amountMax: idle.balance,
    });

    const txs = [
      {
        to: idle.contract.address,
        value: 0,
        data: idle.contract.interface.functions.redeemIdleToken.encode([
          amountWei,
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
        updateTokenPrice={updateTokenPrice}
        formType={FORM_WITHDRAW}
      />
    </React.Fragment>
  );
};

export default Withdraw;
