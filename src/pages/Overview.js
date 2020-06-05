import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Table from "../components/Table";
import { STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED } from "../tokens";

import daiSrc from "../assets/dai.svg";
import usdcSrc from "../assets/usdc.svg";
import usdtSrc from "../assets/usdt.svg";
import bestYieldSrc from "../assets/best-on.svg";
import riskAdjustedSrc from "../assets/risk-on.svg";

import styles from "./Overview.module.css";

const Overview = ({ state, onDepositClick, onWithdrawClick }) => {
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

  const bestYieldTokens = [
    {
      logo: daiSrc,
      erc20: dai,
      idle: idleMaxYieldDai,
      strategyId: STRATEGY_MAXYIELD,
    },
    {
      logo: usdcSrc,
      erc20: usdc,
      idle: idleMaxYieldUsdc,
      strategyId: STRATEGY_MAXYIELD,
    },
    {
      logo: usdtSrc,
      erc20: usdt,
      idle: idleMaxYieldUsdt,
      strategyId: STRATEGY_MAXYIELD,
    },
  ];

  const riskAdjustedTokens = [
    {
      logo: daiSrc,
      erc20: dai,
      idle: idleRiskAdjustedDai,
      strategyId: STRATEGY_RISKADJUSTED,
    },
    {
      logo: usdcSrc,
      erc20: usdc,
      idle: idleRiskAdjustedUsdc,
      strategyId: STRATEGY_RISKADJUSTED,
    },
    {
      logo: usdtSrc,
      erc20: usdt,
      idle: idleRiskAdjustedUsdt,
      strategyId: STRATEGY_RISKADJUSTED,
    },
  ];

  return (
    <React.Fragment>
      <div className={styles.headline}>
        <Title size="xs">
          Earn the yield you deserve without worry about finding the best
          option, either if you want to optimize returns or risks.{" "}
          <a
            className={styles.link}
            href="https://idle.finance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more here.
          </a>
        </Title>
      </div>
      <div className={styles.table}>
        <Table
          iconSrc={bestYieldSrc}
          title="Best-Yield - Maximize your returns"
          tokens={bestYieldTokens}
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
