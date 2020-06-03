import React, { useState, useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { Button, Title, Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";
import initSdk from "@gnosis.pm/safe-apps-sdk";
import { initAllTokens, formatUnits } from "./utils";
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
    return <Loader />;
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

  console.log(state);

  const renderToken = (name, token) => (
    <Text size="lg">
      {name}: {formatUnits(token.balance, token.decimals)}
    </Text>
  );

  const renderIdleToken = (name, token) => (
    <Text size="lg">
      {name}: {formatUnits(token.balance, token.decimals)}, APR:{" "}
      {formatUnits(token.avgAPR, 1)}
    </Text>
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Title size="md">Idle finance</Title>

        {renderToken("DAI", dai)}
        {renderToken("USDC", usdc)}
        {renderToken("USDT", usdt)}

        {renderIdleToken("idleMaxYieldDai", idleMaxYieldDai)}
        {renderIdleToken("idleMaxYieldUsdc", idleMaxYieldUsdc)}
        {renderIdleToken("idleMaxYieldUsdt", idleMaxYieldUsdt)}

        {renderIdleToken("idleRiskAdjustedDai", idleRiskAdjustedDai)}
        {renderIdleToken("idleRiskAdjustedUsdc", idleRiskAdjustedUsdc)}
        {renderIdleToken("idleRiskAdjustedUsdt", idleRiskAdjustedUsdt)}

        <Button size="lg" color="primary" variant="contained">
          Not implemented yet
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
