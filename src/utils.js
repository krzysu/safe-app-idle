import { ethers } from "ethers";
import { FORM_DEPOSIT, FORM_WITHDRAW } from "./const";
import BigNumber from "bignumber.js";

const balanceToBN = ({ balance, decimals }) => {
  const balanceString = ethers.utils.formatUnits(balance, decimals);
  return BNify(balanceString);
};

const parseUnits = (valueString, decimals) =>
  ethers.utils.parseUnits(valueString, decimals);

export const BNify = (s) => new BigNumber(String(s));

export const getIdleTokenId = (strategyId, tokenId) =>
  `${strategyId}_${tokenId}`;

export const formatToken = ({ balance, decimals }, { precision = 8 } = {}) =>
  balanceToBN({ balance, decimals }).toFixed(precision);

export const formatAPR = (balance) =>
  `${balanceToBN({ balance, decimals: 18 }).toFixed(2)}%`;

export const tokenPriceToBN = (token) =>
  balanceToBN({
    balance: token.tokenPrice,
    decimals: token.underlying.decimals,
  });

// multiply idle token balance with token price
export const depositBalanceToBN = (token) =>
  balanceToBN(token.idle).multipliedBy(tokenPriceToBN(token));

export const formatDepositBalance = (token, { precision = 8 } = {}) =>
  depositBalanceToBN(token).toFixed(precision);

export const calculateMaxAmountBN = (formType, formToken) => {
  if (formType === FORM_DEPOSIT) {
    return balanceToBN(formToken.underlying);
  }

  if (formType === FORM_WITHDRAW) {
    return depositBalanceToBN(formToken);
  }
};

export const calculateRealAmountWei = (formType, formToken, amountBN) => {
  if (formType === FORM_DEPOSIT) {
    return parseUnits(
      amountBN.toFixed(formToken.underlying.decimals),
      formToken.underlying.decimals
    );
  }

  if (formType === FORM_WITHDRAW) {
    // divide amount by tokenPrice
    const idleBalanceBN = amountBN.dividedBy(tokenPriceToBN(formToken));
    return parseUnits(
      idleBalanceBN.toFixed(formToken.idle.decimals),
      formToken.idle.decimals
    );
  }
};
