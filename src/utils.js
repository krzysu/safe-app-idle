import { ethers } from "ethers";

// handle very small and big number with e notation
export const toFixedSpecial = (x) => {
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

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

export const tokenPriceToFloat = (token) =>
  balanceToFloat({
    balance: token.tokenPrice,
    decimals: token.underlying.decimals,
  });

// multiply idle token balance with token price
export const depositBalanceToFloat = (token) =>
  balanceToFloat(token.idle) * tokenPriceToFloat(token);

export const formatDepositBalance = (token, { precision = 8 } = {}) =>
  Number.parseFloat(depositBalanceToFloat(token)).toFixed(precision);
