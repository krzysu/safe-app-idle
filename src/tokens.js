const erc20Mainnet = require("@studydefi/money-legos/erc20");
const idleMainnet = require("@studydefi/money-legos/idle");

export const TOKEN_IDLE_MAXYIELD_DAI = "idleMaxYieldDai";
export const TOKEN_IDLE_MAXYIELD_USDC = "idleMaxYieldUsdc";
export const TOKEN_IDLE_MAXYIELD_USDT = "idleMaxYieldUsdt";
export const TOKEN_IDLE_RISKADJUSTED_DAI = "idleRiskAdjustedDai";
export const TOKEN_IDLE_RISKADJUSTED_USDC = "idleRiskAdjustedUsdc";
export const TOKEN_IDLE_RISKADJUSTED_USDT = "idleRiskAdjustedUsdt";

export const STRATEGY_MAXYIELD = "maxYield";
export const STRATEGY_RISKADJUSTED = "riskAdjusted";

const buildErc20Data = ({ address, decimals }) => ({
  address,
  decimals,
});

const buildIdleData = ({ address }) => ({
  address,
  decimals: idleMainnet.decimals,
});

const mainnet = {
  dai: buildErc20Data(erc20Mainnet.dai),
  usdc: buildErc20Data(erc20Mainnet.usdc),
  usdt: {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
  },
  [TOKEN_IDLE_MAXYIELD_DAI]: buildIdleData(idleMainnet.maxYield.dai),
  [TOKEN_IDLE_MAXYIELD_USDC]: buildIdleData(idleMainnet.maxYield.usdc),
  [TOKEN_IDLE_MAXYIELD_USDT]: buildIdleData(idleMainnet.maxYield.usdt),
  [TOKEN_IDLE_RISKADJUSTED_DAI]: buildIdleData(idleMainnet.riskAdjusted.dai),
  [TOKEN_IDLE_RISKADJUSTED_USDC]: buildIdleData(idleMainnet.riskAdjusted.usdc),
  [TOKEN_IDLE_RISKADJUSTED_USDT]: buildIdleData(idleMainnet.riskAdjusted.usdt),
};

const rinkeby = {
  dai: {
    address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    decimals: 18,
  },
  usdc: {
    address: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
    decimals: 6,
  },
  usdt: {
    address: "0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8",
    decimals: 18,
  },
  // I deployed a few Idle mocked contracts on rinkeby
  [TOKEN_IDLE_MAXYIELD_DAI]: buildIdleData({
    address: "0xb20567b77AF55Cd4462941Eb9c9F2bFd734dF84f",
  }),
  [TOKEN_IDLE_MAXYIELD_USDC]: buildIdleData({
    address: "0x7C5E9E8f8Cedba477Efd1eA461aB2e54684C9897",
  }),
  [TOKEN_IDLE_MAXYIELD_USDT]: buildIdleData({
    address: "0x728d6b9940F74B23CAa86a6afA7ea05Cc9d8A51F",
  }),
  [TOKEN_IDLE_RISKADJUSTED_DAI]: buildIdleData({
    address: "0xb20567b77AF55Cd4462941Eb9c9F2bFd734dF84f",
  }),
  [TOKEN_IDLE_RISKADJUSTED_USDC]: buildIdleData({
    address: "0x7C5E9E8f8Cedba477Efd1eA461aB2e54684C9897",
  }),
  [TOKEN_IDLE_RISKADJUSTED_USDT]: buildIdleData({
    address: "0x728d6b9940F74B23CAa86a6afA7ea05Cc9d8A51F",
  }),
};

export default {
  mainnet,
  rinkeby,
  erc20Abi: erc20Mainnet.abi,
  idleAbi: idleMainnet.abi,
};
