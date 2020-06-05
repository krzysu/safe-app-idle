import React from "react";
import { Select } from "@gnosis.pm/safe-react-components";

import daiSrc from "../assets/dai.svg";
import usdcSrc from "../assets/usdc.svg";
import usdtSrc from "../assets/usdt.svg";

const TokenSelect = ({ onChange = () => {}, value = "dai" }) => {
  const items = [
    { id: "dai", label: "DAI", iconUrl: daiSrc },
    { id: "usdc", label: "USDC", iconUrl: usdcSrc },
    { id: "usdt", label: "USDT", iconUrl: usdtSrc },
  ];

  return <Select items={items} activeItemId={value} onItemClick={onChange} />;
};

export default TokenSelect;
