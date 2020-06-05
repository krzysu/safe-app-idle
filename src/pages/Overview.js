import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";
import Table from "../components/Table";

import daiSrc from "../assets/dai.svg";
import usdcSrc from "../assets/usdc.svg";
import usdtSrc from "../assets/usdt.svg";

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
          title="Best-Yield - Maximize your returns"
          tokens={bestYieldTokens}
          onDepositClick={onDepositClick}
          onWithdrawClick={onWithdrawClick}
        />
      </div>
      <div className={styles.table}>
        <Table
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
