import React, { useState, useEffect, useCallback, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { Text, Loader } from "@gnosis.pm/safe-react-components";
import { theme } from "@gnosis.pm/safe-react-components";
import initSdk from "@gnosis.pm/safe-apps-sdk";

import Header from "./components/Header";
import Overview from "./pages/Overview";
import Withdraw from "./pages/Withdraw";
import Deposit from "./pages/Deposit";

import { PAGE_OVERVIEW, PAGE_DEPOSIT, PAGE_WITHDRAW } from "./const";
import { initAllTokens } from "./contracts";
import { reducer, initialState, actions } from "./reducer";
import { getIdleTokenId } from "./utils";

const App = () => {
  const [appsSdk] = useState(initSdk());
  const [state, dispatch] = useReducer(reducer, initialState);

  const { safeInfo, currentPage, isLoaded, tokens } = state;

  useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo: (safeInfo) => {
        dispatch(actions.setSafeInfo(safeInfo));
      },
    });

    return () => appsSdk.removeListeners();
  }, [appsSdk]);

  useEffect(() => {
    const { network, safeAddress } = safeInfo;

    const initTokens = async () => {
      const allTokens = await initAllTokens(network, safeAddress);
      dispatch(actions.setTokens(allTokens));
    };

    if (safeAddress !== "") {
      initTokens();
    }
  }, [safeInfo]);

  const updateTokenPrice = useCallback(
    async (strategyId, tokenId) => {
      const token = tokens[getIdleTokenId(strategyId, tokenId)];
      const tokenPrice = await token.idle.contract.tokenPrice();

      dispatch(actions.updateTokenPrice(strategyId, tokenId, tokenPrice));
    },
    [tokens]
  );

  const goToDeposit = useCallback(
    (tokenId, strategyId) => () => {
      dispatch(actions.goToPage(PAGE_DEPOSIT, { tokenId, strategyId }));
    },
    []
  );

  const goToWithdraw = useCallback(
    (tokenId, strategyId) => () => {
      dispatch(actions.goToPage(PAGE_WITHDRAW, { tokenId, strategyId }));
    },
    []
  );

  const goToOverview = useCallback(() => {
    dispatch(actions.goToPage(PAGE_OVERVIEW));
  }, []);

  if (!isLoaded) {
    return <Loader size="md" />;
  }

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
        <Deposit state={state} appsSdk={appsSdk} onBackClick={goToOverview} />
      )}
      {currentPage === PAGE_WITHDRAW && (
        <Withdraw
          state={state}
          appsSdk={appsSdk}
          onBackClick={goToOverview}
          updateTokenPrice={updateTokenPrice}
        />
      )}
      <footer>
        <Text size="md">
          The source code of this app is available on{" "}
          <a
            href="https://github.com/krzysu/safe-app-idle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </Text>
      </footer>
    </ThemeProvider>
  );
};

export default App;
