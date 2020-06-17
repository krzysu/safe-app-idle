import React, { useMemo } from "react";
import { Select } from "@gnosis.pm/safe-react-components";

const filterByToken = (items, tokenId) => {
  return items.filter((item) => item.tokens.includes(tokenId));
};

const StrategySelect = ({ onChange = () => {}, value, items, tokenId }) => {
  const currentItems = useMemo(() => filterByToken(items, tokenId), [
    items,
    tokenId,
  ]);

  return (
    <Select items={currentItems} activeItemId={value} onItemClick={onChange} />
  );
};

export default StrategySelect;
