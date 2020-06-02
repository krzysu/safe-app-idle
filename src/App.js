import React, { useState, useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { Button, Title, Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";
import initSdk from "@gnosis.pm/safe-apps-sdk";
import { getToken, formatUnits } from "./utils";
import { reducer, initialState, actions } from "./reducer";

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
    const getTokens = async () => {
      const { network, safeAddress } = state.safeInfo;

      const daiToken = await getToken(network, safeAddress, "dai");
      const usdcToken = await getToken(network, safeAddress, "usdc");
      const usdtToken = await getToken(network, safeAddress, "usdt");

      dispatch(actions.setToken(daiToken));
      dispatch(actions.setToken(usdcToken));
      dispatch(actions.setToken(usdtToken));
    };

    if (state.isLoaded) {
      getTokens();
    }
  }, [state.isLoaded, state.safeInfo]);

  if (!state.isLoaded) {
    return <Loader />;
  }

  const { dai, usdc, usdt } = state.tokens;

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Title size="md">Idle finance</Title>

        <Text size="lg">DAI: {formatUnits(dai.balance, dai.decimals)}</Text>
        <Text size="lg">USDC: {formatUnits(usdc.balance, usdc.decimals)}</Text>
        <Text size="lg">USDT: {formatUnits(usdt.balance, usdt.decimals)}</Text>

        <Button size="lg" color="primary" variant="contained">
          Not implemented yet
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
