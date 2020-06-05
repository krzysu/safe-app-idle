import React, { useState } from "react";
import { Select } from "@gnosis.pm/safe-react-components";

import bestYieldSrc from "../assets/best-on.svg";
import riskAdjustedSrc from "../assets/risk-on.svg";

import styles from "./StrategySelect.module.css";

const StrategySelect = ({ onChange = () => {}, defaultValue = "maxYield" }) => {
  const items = [
    { id: "maxYield", label: "Best-Yield", iconUrl: bestYieldSrc },
    { id: "riskAdjusted", label: "Risk-Adjusted", iconUrl: riskAdjustedSrc },
  ];

  const [activeId, setActiveId] = useState(defaultValue);
  return (
    <div className={styles.select}>
      <Select
        items={items}
        activeItemId={activeId}
        onItemClick={(id) => {
          setActiveId(id);
          onChange(id);
        }}
      />
    </div>
  );
};

export default StrategySelect;
