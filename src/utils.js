import { ethers } from "ethers";

export const getIdleTokenId = (strategyId, tokenId) =>
  `${strategyId}_${tokenId}`;

export const formatToken = (
  { balance, decimals, symbol },
  { withSymbol = true, fixed = 4 } = {}
) => {
  const balanceString = ethers.utils.formatUnits(balance, decimals);
  return `${Number.parseFloat(balanceString).toFixed(fixed)} ${
    withSymbol ? symbol : ""
  }`;
};

export const balanceToFloat = (
  { balance, decimals },
  { divideBy = 1, multiBy = 1 } = {}
) => {
  const newBalance = balance.div(divideBy).mul(multiBy);
  const balanceString = ethers.utils.formatUnits(newBalance, decimals);
  return Number.parseFloat(balanceString);
};

export const formatAPR = (balance = "0") => {
  const aprString = ethers.utils.formatUnits(balance, 18);
  return `${Number.parseFloat(aprString).toFixed(2)}%`;
};

export const parseUnits = (valueString, decimals = 18) =>
  ethers.utils.parseUnits(valueString, decimals);

const tokenPriceToFloat = (token) =>
  balanceToFloat({
    balance: token.tokenPrice,
    decimals: token.underlying.decimals,
  });

// multiply idle token balance with token price
const depositBalanceToFloat = (token) =>
  balanceToFloat(token.idle) * tokenPriceToFloat(token);

export const formatDepositBalance = (token) =>
  Number.parseFloat(depositBalanceToFloat(token)).toFixed(2);
