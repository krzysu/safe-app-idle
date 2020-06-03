const erc20Mainnet = require("@studydefi/money-legos/erc20");
const idleMainnet = require("@studydefi/money-legos/idle");

export const TOKEN_IDLE_MAXYIELD_DAI = "idleMaxYieldDai";
export const TOKEN_IDLE_MAXYIELD_USDC = "idleMaxYieldUsdc";
export const TOKEN_IDLE_MAXYIELD_USDT = "idleMaxYieldUsdt";
export const TOKEN_IDLE_RISKADJUSTED_DAI = "idleRiskAdjustedDai";
export const TOKEN_IDLE_RISKADJUSTED_USDC = "idleRiskAdjustedUsdc";
export const TOKEN_IDLE_RISKADJUSTED_USDT = "idleRiskAdjustedUsdt";

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
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
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
    address: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    decimals: 18,
  },
  usdc: {
    address: "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b",
    decimals: 6,
  },
  usdt: {
    address: "0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02",
    decimals: 18,
  },
  // all of them using the same mocked contract
  [TOKEN_IDLE_MAXYIELD_DAI]: buildIdleData({
    address: "0x7e275981Fc00aD9B906cce19C8186054B1Cfda93",
  }),
  [TOKEN_IDLE_MAXYIELD_USDC]: buildIdleData({
    address: "0x7e275981Fc00aD9B906cce19C8186054B1Cfda93",
  }),
  [TOKEN_IDLE_MAXYIELD_USDT]: buildIdleData({
    address: "0x7e275981Fc00aD9B906cce19C8186054B1Cfda93",
  }),
  [TOKEN_IDLE_RISKADJUSTED_DAI]: buildIdleData({
    address: "0x7e275981Fc00aD9B906cce19C8186054B1Cfda93",
  }),
  [TOKEN_IDLE_RISKADJUSTED_USDC]: buildIdleData({
    address: "0x7e275981Fc00aD9B906cce19C8186054B1Cfda93",
  }),
  [TOKEN_IDLE_RISKADJUSTED_USDT]: buildIdleData({
    address: "0x7e275981Fc00aD9B906cce19C8186054B1Cfda93",
  }),
};

export default {
  mainnet,
  rinkeby,
  erc20Abi: erc20Mainnet.abi,
  idleAbi: idleMainnet.abi,
};
