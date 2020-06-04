import React, { useState, useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";
import initSdk from "@gnosis.pm/safe-apps-sdk";

import { initAllTokens, parseUnits } from "./utils";
import { reducer, initialState, actions } from "./reducer";
import Header from "./components/Header";
import Table from "./components/Table";

import daiSrc from "./assets/dai.svg";
import usdcSrc from "./assets/usdc.svg";
import usdtSrc from "./assets/usdt.svg";

const App = () => {
  const [appsSdk] = useState(initSdk());
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo: (safeInfo) => {
        dispatch(actions.setSafeInfo(safeInfo));
      },
    });

    return () => appsSdk.removeListeners();
  }, [appsSdk]);

  useEffect(() => {
    const { network, safeAddress } = state.safeInfo;

    const initTokens = async () => {
      const tokens = await initAllTokens(network, safeAddress);
      dispatch(actions.setTokens(tokens));
    };

    if (safeAddress !== "") {
      initTokens();
    }
  }, [state.safeInfo]);

  if (!state.isLoaded) {
    return <Loader size="md" />;
  }

  const {
    dai,
    usdc,
    usdt,
    idleMaxYieldDai,
    idleMaxYieldUsdc,
    idleMaxYieldUsdt,
    idleRiskAdjustedDai,
    idleRiskAdjustedUsdc,
    idleRiskAdjustedUsdt,
  } = state.tokens;

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

    appsSdk.sendTransactions(txs);
  };

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

    appsSdk.sendTransactions(txs);
  };

  const bestYieldTokens = [
    {
      name: "dai",
      logo: daiSrc,
      erc20: dai,
      idle: idleMaxYieldDai,
    },
    {
      name: "usdc",
      logo: usdcSrc,
      erc20: usdc,
      idle: idleMaxYieldUsdc,
    },
    {
      name: "usdt",
      logo: usdtSrc,
      erc20: usdt,
      idle: idleMaxYieldUsdt,
    },
  ];

  const riskAdjustedTokens = [
    {
      name: "dai",
      logo: daiSrc,
      erc20: dai,
      idle: idleRiskAdjustedDai,
    },
    {
      name: "usdc",
      logo: usdcSrc,
      erc20: usdc,
      idle: idleRiskAdjustedUsdc,
    },
    {
      name: "usdt",
      logo: usdtSrc,
      erc20: usdt,
      idle: idleRiskAdjustedUsdt,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Table
        title="Best-Yield - Maximize your returns"
        tokens={bestYieldTokens}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
      />
      <Table
        title="Risk-Adjusted - Optimize your risk exposure"
        tokens={riskAdjustedTokens}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
      />
      <footer>
        <Text size="md">
          Disclaimer: The author of this app did his best to provide fully
          functional service. Despite that, the author doesn't take any
          responsibility for the app. Interacting with this app is at your own
          risk.
        </Text>
      </footer>
    </ThemeProvider>
  );
};

export default App;
