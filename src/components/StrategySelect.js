import React, { useMemo } from "react";
import { Select } from "@gnosis.pm/safe-react-components";
import { STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED } from "../const";

import bestYieldSrc from "../assets/best-on.svg";
import riskAdjustedSrc from "../assets/risk-on.svg";

const items = [
  {
    id: STRATEGY_MAXYIELD,
    label: "Best-Yield",
    iconUrl: bestYieldSrc,
    tokens: ["dai", "usdc", "usdt", "susd", "tusd", "wbtc"],
  },
  {
    id: STRATEGY_RISKADJUSTED,
    label: "Risk-Adjusted",
    iconUrl: riskAdjustedSrc,
    tokens: ["dai", "usdc", "usdt"],
  },
];

const filterByToken = (items, tokenId) => {
  return items.filter((item) => item.tokens.includes(tokenId));
};

const StrategySelect = ({
  onChange = () => {},
  value = STRATEGY_MAXYIELD,
  tokenId,
}) => {
  const currentItems = useMemo(() => filterByToken(items, tokenId), [tokenId]);

  return (
    <Select items={currentItems} activeItemId={value} onItemClick={onChange} />
  );
};

export default StrategySelect;
