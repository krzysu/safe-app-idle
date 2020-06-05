import React from "react";
import { Button, Text } from "@gnosis.pm/safe-react-components";

const Withdraw = ({ state, onBackClick }) => {
  const handleWithdraw = (idle) => () => {
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

    // appsSdk.sendTransactions(txs);
  };

  return (
    <React.Fragment>
      <Text size="xl">Withdraw</Text>

      <Button
        size="md"
        color="primary"
        variant="contained"
        onClick={onBackClick}
      >
        Back
      </Button>
    </React.Fragment>
  );
};

export default Withdraw;
