import React from "react";
import { ThemeProvider } from "styled-components";
import { Button, Title, Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";

import "./App.css";

const App = () => {
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
