import {
  TOKEN_IDLE_MAXYIELD_DAI,
  TOKEN_IDLE_MAXYIELD_USDC,
  TOKEN_IDLE_MAXYIELD_USDT,
  TOKEN_IDLE_RISKADJUSTED_USDT,
  TOKEN_IDLE_RISKADJUSTED_DAI,
  TOKEN_IDLE_RISKADJUSTED_USDC,
} from "./tokens";

export const PAGE_OVERVIEW = "overview";
export const PAGE_DEPOSIT = "deposit";
export const PAGE_WITHDRAW = "withdraw";

export const initialState = {
  isLoaded: false,
  safeInfo: {
    safeAddress: "",
    network: "",
    ethBalance: "0",
  },
  tokens: {
    dai: {
      name: "dai",
      contract: null,
      balance: "0",
      decimals: 0,
    },
    usdc: {},
    usdt: {},
    [TOKEN_IDLE_MAXYIELD_DAI]: {},
    [TOKEN_IDLE_MAXYIELD_USDC]: {},
    [TOKEN_IDLE_MAXYIELD_USDT]: {},
    [TOKEN_IDLE_RISKADJUSTED_DAI]: {},
    [TOKEN_IDLE_RISKADJUSTED_USDC]: {},
    [TOKEN_IDLE_RISKADJUSTED_USDT]: {},
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
        tokens: {
          ...state.tokens,
          ...action.payload,
        },
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
