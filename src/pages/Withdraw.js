import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form, { FORM_WITHDRAW } from "../components/Form";
import { getIdleTokenId, formatToken } from "../utils";

const Withdraw = ({ state, appsSdk, onBackClick, updateTokenPrice }) => {
  const handleWithdraw = ({ tokenId, strategyId, amountWei }) => {
    const { idle } = state.tokens[getIdleTokenId(strategyId, tokenId)];

    console.log("WITHDRAW", {
      tokenId,
      strategyId,
      amountWei: formatToken({ balance: amountWei, decimals: idle.decimals }),
      idleBalance: formatToken(idle),
    });

    const txs = [
      {
        to: idle.contract.address,
        value: 0,
        data: idle.contract.interface.functions.redeemIdleToken.encode([
          idle.balance, // TODO replace to amountWei
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
