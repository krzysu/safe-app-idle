import React from "react";
import { Select } from "@gnosis.pm/safe-react-components";
import { STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED } from "../const";

import bestYieldSrc from "../assets/best-on.svg";
import riskAdjustedSrc from "../assets/risk-on.svg";

const StrategySelect = ({ onChange = () => {}, value = STRATEGY_MAXYIELD }) => {
  const items = [
    { id: STRATEGY_MAXYIELD, label: "Best-Yield", iconUrl: bestYieldSrc },
    {
      id: STRATEGY_RISKADJUSTED,
      label: "Risk-Adjusted",
      iconUrl: riskAdjustedSrc,
    },
  ];

  return <Select items={items} activeItemId={value} onItemClick={onChange} />;
};

export default StrategySelect;
