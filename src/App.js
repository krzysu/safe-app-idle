import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Button, Title, Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";
import initSdk from "@gnosis.pm/safe-apps-sdk";

import "./App.css";

const App = () => {
  const [appsSdk] = useState(initSdk());
  const [safeInfo, setSafeInfo] = useState();

  useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo: setSafeInfo,
    });

    return () => appsSdk.removeListeners();
  }, [appsSdk]);

  useEffect(() => {
    if (safeInfo !== undefined) {
      console.log(safeInfo);
    }
  }, [safeInfo]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Title size="md">Idle finance</Title>
        <Button size="lg" color="primary" variant="contained">
          Deposit
        </Button>
        <Loader />
        <Text size="lg">Test text</Text>
      </div>
    </ThemeProvider>
  );
};

export default App;
