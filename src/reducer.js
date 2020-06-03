import {
  TOKEN_IDLE_MAXYIELD_DAI,
  TOKEN_IDLE_MAXYIELD_USDC,
  TOKEN_IDLE_MAXYIELD_USDT,
  TOKEN_IDLE_RISKADJUSTED_USDT,
  TOKEN_IDLE_RISKADJUSTED_DAI,
  TOKEN_IDLE_RISKADJUSTED_USDC,
} from "./tokens";

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
};

const SET_SAFE_INFO = "SET_SAFE_INFO";
const SET_TOKENS = "SET_TOKENS";

export const actions = {
  setSafeInfo: (safeInfo) => ({
    type: SET_SAFE_INFO,
    payload: safeInfo,
  }),
  setTokens: (tokens) => ({
    type: SET_TOKENS,
    payload: tokens,
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

    default:
      return state;
  }
};
