import React, { useState } from "react";
import { Select } from "@gnosis.pm/safe-react-components";

import daiSrc from "../assets/dai.svg";
import usdcSrc from "../assets/usdc.svg";
import usdtSrc from "../assets/usdt.svg";

const TokenSelect = ({ onChange = () => {}, defaultValue = "dai" }) => {
  const items = [
    { id: "dai", label: "DAI", iconUrl: daiSrc },
    { id: "usdc", label: "USDC", iconUrl: usdcSrc },
    { id: "usdt", label: "USDT", iconUrl: usdtSrc },
  ];

  const [activeId, setActiveId] = useState(defaultValue);
  return (
    <Select
      items={items}
      activeItemId={activeId}
      onItemClick={(id) => {
        setActiveId(id);
        onChange(id);
      }}
    />
  );
};

export default TokenSelect;
