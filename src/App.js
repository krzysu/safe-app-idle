import React, { useState, useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";
import initSdk from "@gnosis.pm/safe-apps-sdk";

import { initAllTokens } from "./utils";
import { reducer, initialState, actions } from "./reducer";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Withdraw from "./components/Withdraw";
import Deposit from "./components/Deposit";

const PAGE_OVERVIEW = "overview";
const PAGE_DEPOSIT = "deposit";
const PAGE_WITHDRAW = "withdraw";

const App = () => {
  const [appsSdk] = useState(initSdk());
  const [currentPage, setCurrentPage] = useState(PAGE_OVERVIEW);
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

  const goToDeposit = () => {
    setCurrentPage(PAGE_DEPOSIT);
  };
  const goToWithdraw = () => {
    setCurrentPage(PAGE_WITHDRAW);
  };
  const goToOverview = () => {
    setCurrentPage(PAGE_OVERVIEW);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {currentPage === PAGE_OVERVIEW && (
        <Overview
          state={state}
          onDepositClick={goToDeposit}
          onWithdrawClick={goToWithdraw}
        />
      )}
      {currentPage === PAGE_DEPOSIT && (
        <Deposit state={state} onBackClick={goToOverview} />
      )}
      {currentPage === PAGE_WITHDRAW && (
        <Withdraw state={state} onBackClick={goToOverview} />
      )}
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
