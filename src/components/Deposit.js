import React from "react";
import { Button, Text } from "@gnosis.pm/safe-react-components";
import { parseUnits } from "../utils";

const Deposit = ({ state, onBackClick }) => {
  const handleDeposit = (erc20, idle, amount) => () => {
    const amountWei = parseUnits(amount, erc20.decimals);

    // deposit 1 DAI for now
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

    // appsSdk.sendTransactions(txs);
  };

  return (
    <React.Fragment>
      <Text size="xl">Deposit</Text>

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

export default Deposit;
