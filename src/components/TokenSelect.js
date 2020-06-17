import React, { useMemo } from "react";
import { Select } from "@gnosis.pm/safe-react-components";
import { STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED } from "../const";

import daiSrc from "../assets/dai.svg";
import usdcSrc from "../assets/usdc.svg";
import usdtSrc from "../assets/usdt.svg";
import susdSrc from "../assets/susd.svg";
import tusdSrc from "../assets/tusd.svg";
import wbtcSrc from "../assets/wbtc.svg";

const items = [
  {
    id: "dai",
    label: "DAI",
    iconUrl: daiSrc,
    strategies: [STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED],
  },
  {
    id: "usdc",
    label: "USDC",
    iconUrl: usdcSrc,
    strategies: [STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED],
  },
  {
    id: "usdt",
    label: "USDT",
    iconUrl: usdtSrc,
    strategies: [STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED],
  },
  {
    id: "susd",
    label: "SUSD",
    iconUrl: susdSrc,
    strategies: [STRATEGY_MAXYIELD],
  },
  {
    id: "tusd",
    label: "TUSD",
    iconUrl: tusdSrc,
    strategies: [STRATEGY_MAXYIELD],
  },
  {
    id: "wbtc",
    label: "WBTC",
    iconUrl: wbtcSrc,
    strategies: [STRATEGY_MAXYIELD],
  },
];

const filterByStrategy = (items, strategyId) => {
  return items.filter((item) => item.strategies.includes(strategyId));
};

const TokenSelect = ({ onChange = () => {}, value = "dai", strategyId }) => {
  const currentItems = useMemo(() => filterByStrategy(items, strategyId), [
    strategyId,
  ]);

  return (
    <Select items={currentItems} activeItemId={value} onItemClick={onChange} />
  );
};

export default TokenSelect;
