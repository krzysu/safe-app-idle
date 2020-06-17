import React, { useMemo } from "react";
import { Select } from "@gnosis.pm/safe-react-components";

const filterByStrategy = (items, strategyId) => {
  return items.filter((item) => item.strategies.includes(strategyId));
};

const TokenSelect = ({
  onChange = () => {},
  value = "dai",
  items,
  strategyId,
}) => {
  const currentItems = useMemo(() => filterByStrategy(items, strategyId), [
    items,
    strategyId,
  ]);

  return (
    <Select items={currentItems} activeItemId={value} onItemClick={onChange} />
  );
};

export default TokenSelect;
