import { PAGE_OVERVIEW } from "./const";

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

    default:
      return state;
  }
};
