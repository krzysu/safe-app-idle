import React, { useState, useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";
import initSdk from "@gnosis.pm/safe-apps-sdk";
import { initAllTokens, formatUnits } from "./utils";
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

  const handleDeposit = () => {
    console.log("handleDeposit");
  };

  const handleWithdraw = () => {
    console.log("handleWithdraw");
  };

  const bestYieldTokens = [
    {
      name: "dai",
      logo: daiSrc,
      funds: dai,
      deposit: idleMaxYieldDai,
      avgAPR: idleMaxYieldDai.avgAPR,
    },
    {
      name: "usdc",
      logo: usdcSrc,
      funds: usdc,
      deposit: idleMaxYieldUsdc,
      avgAPR: idleMaxYieldUsdc.avgAPR,
    },
    {
      name: "usdt",
      logo: usdtSrc,
      funds: usdt,
      deposit: idleMaxYieldUsdt,
      avgAPR: idleMaxYieldUsdt.avgAPR,
    },
  ];

  const riskAdjustedTokens = [
    {
      name: "dai",
      logo: daiSrc,
      funds: dai,
      deposit: idleRiskAdjustedDai,
      avgAPR: idleRiskAdjustedDai.avgAPR,
    },
    {
      name: "usdc",
      logo: usdcSrc,
      funds: usdc,
      deposit: idleRiskAdjustedUsdc,
      avgAPR: idleRiskAdjustedUsdc.avgAPR,
    },
    {
      name: "usdt",
      logo: usdtSrc,
      funds: usdt,
      deposit: idleRiskAdjustedUsdt,
      avgAPR: idleRiskAdjustedUsdt.avgAPR,
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
        <Text size="md">Disclaimer TODO</Text>
      </footer>
    </ThemeProvider>
  );
};

export default App;
