import { ethers } from "ethers";

export const getIdleTokenId = (strategyId, tokenId) =>
  `${strategyId}_${tokenId}`;

export const formatToken = ({ balance, decimals }, { precision = 8 } = {}) => {
  const balanceString = ethers.utils.formatUnits(balance, decimals);
  return Number.parseFloat(balanceString).toFixed(precision);
};

export const balanceToFloat = ({ balance, decimals }) => {
  const balanceString = ethers.utils.formatUnits(balance, decimals);
  return Number.parseFloat(balanceString);
};

export const formatAPR = (balance = "0") => {
  const aprString = ethers.utils.formatUnits(balance, 18);
  return `${Number.parseFloat(aprString).toFixed(2)}%`;
};

export const parseUnits = (valueString, decimals) =>
  ethers.utils.parseUnits(valueString, decimals);

const tokenPriceToFloat = (token) =>
  balanceToFloat({
    balance: token.tokenPrice,
    decimals: token.underlying.decimals,
  });

// multiply idle token balance with token price
export const depositBalanceToFloat = (token) =>
  balanceToFloat(token.idle) * tokenPriceToFloat(token);

export const formatDepositBalance = (token, { precision = 8 } = {}) =>
  Number.parseFloat(depositBalanceToFloat(token)).toFixed(precision);
