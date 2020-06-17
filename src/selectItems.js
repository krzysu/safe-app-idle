import {
  ALL_TOKENIDS,
  TOKENID_TO_LOGOSRC_MAP,
  STRATEGY_MAXYIELD,
  STRATEGY_RISKADJUSTED,
} from "./const";

import maxYieldSrc from "./assets/best-on.svg";
import riskAdjustedSrc from "./assets/risk-on.svg";

const toArray = (obj) => Object.keys(obj).map((key) => obj[key]);

const getTokensByStrategy = (tokensArray, strategyId) =>
  tokensArray
    .filter((token) => token.strategyId === strategyId)
    .map((token) => token.tokenId);

const getStrategiesByToken = (tokensArray, tokenId) =>
  tokensArray
    .filter((token) => token.tokenId === tokenId)
    .map((token) => token.strategyId);

export const buildTokenSelectItems = (tokens) => {
  const tokensArray = toArray(tokens);

  const items = ALL_TOKENIDS.map((tokenId) => {
    const strategies = getStrategiesByToken(tokensArray, tokenId);
    if (strategies.length > 0) {
      return {
        id: tokenId,
        label: tokenId.toUpperCase(),
        iconUrl: TOKENID_TO_LOGOSRC_MAP[tokenId],
        strategies,
      };
    }
    return false;
  }).filter((item) => !!item);

  return items;
};

export const buildStrategySelectItems = (tokens) => {
  const items = [];
  const tokensArray = toArray(tokens);
  const maxYieldTokens = getTokensByStrategy(tokensArray, STRATEGY_MAXYIELD);
  const riskAdjustedTokens = getTokensByStrategy(
    tokensArray,
    STRATEGY_RISKADJUSTED
  );

  if (maxYieldTokens.length > 0) {
    items.push({
      id: STRATEGY_MAXYIELD,
      label: "Best-Yield",
      iconUrl: maxYieldSrc,
      tokens: maxYieldTokens,
    });
  }

  if (riskAdjustedTokens.length > 0) {
    items.push({
      id: STRATEGY_RISKADJUSTED,
      label: "Risk-Adjusted",
      iconUrl: riskAdjustedSrc,
      tokens: riskAdjustedTokens,
    });
  }

  return items;
};
