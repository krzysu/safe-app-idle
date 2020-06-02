export const initialState = {
  isLoaded: false,
  safeInfo: {
    safeAddress: "",
    network: "",
    ethBalance: "0",
  },
  tokens: {
    dai: {
      contract: null,
      balance: "0",
      decimals: 0,
    },
    usdc: {
      contract: null,
      balance: "0",
      decimals: 0,
    },
    usdt: {
      contract: null,
      balance: "0",
      decimals: 0,
    },
  },
};

const SET_SAFE_INFO = "SET_SAFE_INFO";
const SET_TOKEN = "SET_TOKEN";

export const actions = {
  setSafeInfo: (safeInfo) => ({
    type: SET_SAFE_INFO,
    payload: safeInfo,
  }),
  setToken: (token) => ({
    type: SET_TOKEN,
    payload: token,
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
        isLoaded: action.payload.safeAddress !== "",
      };

    case SET_TOKEN:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
