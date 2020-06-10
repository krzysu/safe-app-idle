import { PAGE_OVERVIEW } from "./const";
import { getIdleTokenId } from "./utils";

export const initialState = {
  isLoaded: false,
  safeInfo: {
    safeAddress: "",
    network: "",
    ethBalance: "0",
  },
  tokens: {
    exampleToken: {
      // set in tokens.js
      address: "",
      decimals: "",
      logo: "",
      strategyId: "",
      tokenId: "",

      // set in contracts.js
      tokenPrice: "",
      avgAPR: "",
      underlying: {
        symbol: "",
        contract: "",
        balance: "",
        decimals: "",
      },
      idle: {
        symbol: "",
        contract: "",
        balance: "",
        decimals: "",
      },
    },
  },
  currentPage: PAGE_OVERVIEW,
  currentTokenId: "",
  currentStrategyId: "",
};

const SET_SAFE_INFO = "SET_SAFE_INFO";
const SET_TOKENS = "SET_TOKENS";
const GO_TO_PAGE = "GO_TO_PAGE";
const UPDATE_TOKEN_PRICE = "UPDATE_TOKEN_PRICE";

export const actions = {
  setSafeInfo: (safeInfo) => ({
    type: SET_SAFE_INFO,
    payload: safeInfo,
  }),

  setTokens: (tokens) => ({
    type: SET_TOKENS,
    payload: tokens,
  }),

  goToPage: (page, data = {}) => ({
    type: GO_TO_PAGE,
    payload: { page, data },
  }),

  updateTokenPrice: (strategyId, tokenId, price) => ({
    type: UPDATE_TOKEN_PRICE,
    payload: { strategyId, tokenId, price },
  }),
};

// reducer helpers
const updateTokenPrice = (tokens, { strategyId, tokenId, price }) => {
  const idleId = getIdleTokenId(strategyId, tokenId);

  return {
    ...tokens,
    [idleId]: {
      ...tokens[idleId],
      tokenPrice: price,
    },
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_SAFE_INFO:
      return {
        ...state,
        safeInfo: {
          ...action.payload,
          network: action.payload.network.toLowerCase(),
        },
      };

    case SET_TOKENS:
      return {
        ...state,
        tokens: action.payload,
        isLoaded: true,
      };

    case GO_TO_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
        currentTokenId: action.payload.data.tokenId,
        currentStrategyId: action.payload.data.strategyId,
      };

    case UPDATE_TOKEN_PRICE:
      return {
        ...state,
        tokens: updateTokenPrice(state.tokens, action.payload),
      };

    default:
      return state;
  }
};
