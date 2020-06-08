import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Form, { FORM_WITHDRAW } from "../components/Form";
import { getIdleTokenId, parseUnits, formatToken } from "../utils";

const Withdraw = ({ state, appsSdk, onBackClick }) => {
  const handleWithdraw = ({ tokenId, strategyId, amount }) => {
    const withdraw = async () => {
      const erc20 = state.tokens[tokenId];
      const idle = state.tokens[getIdleTokenId(tokenId, strategyId)];
      const amountWei = parseUnits(amount.toString(), erc20.decimals);

      // get latest price
      const idleTokenPrice = await idle.contract.tokenPrice();
      // calculate idleTokenAmount to withdraw
      const idleTokenAmount = amountWei.div(idleTokenPrice);
      // check if idleTokenAmount is not more than balanceIdle, if yes, withdraw all
      const withdrawAmount = idleTokenAmount.gt(idle.balanceIdle)
        ? idle.balanceIdle
        : idleTokenAmount;

      console.log({
        amountWei: formatToken({ ...erc20, balance: amountWei }, { fixed: 18 }),
        idleTokenPrice: formatToken(
          { ...idle, balance: idleTokenPrice },
          { fixed: 18 }
        ),
        isGt: idleTokenAmount.gt(idle.balanceIdle),
        idleTokenAmount: formatToken(
          { ...idle, balance: idleTokenAmount },
          { fixed: 18 }
        ),
        max: formatToken({ ...idle, balance: idle.balanceIdle }, { fixed: 18 }),
      });

      // withdraw everything for now
      const txs = [
        {
          to: idle.contract.address,
          value: 0,
          data: idle.contract.interface.functions.redeemIdleToken.encode([
            withdrawAmount,
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
