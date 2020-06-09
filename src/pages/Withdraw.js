import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form, { FORM_WITHDRAW } from "../components/Form";
import { getIdleTokenId, parseUnits, formatToken } from "../utils";

const Withdraw = ({ state, appsSdk, onBackClick }) => {
  const handleWithdraw = ({ tokenId, strategyId, amount }) => {
    const withdraw = async () => {
      const erc20 = state.tokens[tokenId];
      const idle = state.tokens[getIdleTokenId(strategyId, tokenId)];
      // const amountWei = parseUnits(amount.toString(), erc20.decimals);

      // get latest price
      const idleTokenPrice = await idle.contract.tokenPrice();
      // calculate idleTokenAmount to withdraw
      // const idleTokenAmount = amountWei.div(idleTokenPrice);
      // check if idleTokenAmount is not more than balanceIdle, if yes, withdraw all
      // const withdrawAmount = idleTokenAmount.gt(idle.balanceIdle)
      //   ? idle.balanceIdle
      //   : idleTokenAmount;

      console.log({
        max: formatToken({ ...idle, balance: idle.balance }, { fixed: 18 }),
      });

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

    withdraw();
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
