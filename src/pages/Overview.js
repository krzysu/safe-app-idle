import React, { useMemo } from "react";
import { Text } from "@gnosis.pm/safe-react-components";
import Table from "../components/Table";
import { STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED } from "../const";

import maxYieldSrc from "../assets/best-on.svg";
import riskAdjustedSrc from "../assets/risk-on.svg";

import styles from "./Overview.module.css";

const findAllByStrategy = (tokenArray, strategyId) => {
  return tokenArray.filter((token) => token.strategyId === strategyId);
};

const Overview = ({ state, onDepositClick, onWithdrawClick }) => {
  const { tokens } = state;
  const tokenArray = useMemo(
    () => Object.keys(tokens).map((key) => tokens[key]),
    [tokens]
  );
  const maxYieldTokens = useMemo(
    () => findAllByStrategy(tokenArray, STRATEGY_MAXYIELD),
    [tokenArray]
  );
  const riskAdjustedTokens = useMemo(
    () => findAllByStrategy(tokenArray, STRATEGY_RISKADJUSTED),
    [tokenArray]
  );

  return (
    <React.Fragment>
      <div className={styles.headline}>
        <Text size="lg">
          Earn the yield you deserve without worry about finding the best
          option, either if you want to optimize returns or risks. <br />
          <a
            className={styles.link}
            href="https://idle.finance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </Text>
      </div>
      <div className={styles.table}>
        <Table
          iconSrc={maxYieldSrc}
          title="Best-Yield - Maximize your returns"
          tokens={maxYieldTokens}
          onDepositClick={onDepositClick}
          onWithdrawClick={onWithdrawClick}
        />
      </div>
      <div className={styles.table}>
        <Table
          iconSrc={riskAdjustedSrc}
          title="Risk-Adjusted - Optimize your risk exposure"
          tokens={riskAdjustedTokens}
          onDepositClick={onDepositClick}
          onWithdrawClick={onWithdrawClick}
        />
      </div>
    </React.Fragment>
  );
};

export default Overview;
