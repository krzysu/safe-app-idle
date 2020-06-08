import { ethers } from "ethers";
import tokens, {
  TOKEN_IDLE_MAXYIELD_DAI,
  TOKEN_IDLE_MAXYIELD_USDC,
  TOKEN_IDLE_MAXYIELD_USDT,
  TOKEN_IDLE_RISKADJUSTED_USDT,
  TOKEN_IDLE_RISKADJUSTED_DAI,
  TOKEN_IDLE_RISKADJUSTED_USDC,
  STRATEGY_MAXYIELD,
  STRATEGY_RISKADJUSTED,
} from "./tokens";

const TOKEN_IDS_MAPPING = {
  [STRATEGY_MAXYIELD]: {
    dai: TOKEN_IDLE_MAXYIELD_DAI,
    usdc: TOKEN_IDLE_MAXYIELD_USDC,
    usdt: TOKEN_IDLE_MAXYIELD_USDT,
  },
  [STRATEGY_RISKADJUSTED]: {
    dai: TOKEN_IDLE_RISKADJUSTED_DAI,
    usdc: TOKEN_IDLE_RISKADJUSTED_USDC,
    usdt: TOKEN_IDLE_RISKADJUSTED_USDT,
  },
};

export const getIdleTokenId = (tokenId, strategyId) => {
  return TOKEN_IDS_MAPPING[strategyId][tokenId];
};

export const formatToken = (
  { balance, decimals, name },
  { withSymbol = true, fixed = 4 } = {}
) => {
  const balanceString = ethers.utils.formatUnits(balance, decimals);
  return `${Number.parseFloat(balanceString).toFixed(fixed)} ${
    withSymbol ? name.toUpperCase() : ""
  }`;
};

export const balanceToFloat = (
  { balance, decimals },
  { divideBy = 1, multiBy = 1 } = {}
) => {
  const newBalance = balance.div(divideBy).mul(multiBy);
  const balanceString = ethers.utils.formatUnits(newBalance, decimals);
  return Number.parseFloat(balanceString);
};

export const formatAPR = (balance = "0") => {
  const aprString = ethers.utils.formatUnits(balance, 18);
  return `${Number.parseFloat(aprString).toFixed(2)}%`;
};

export const parseUnits = (valueString, decimals = 18) =>
  ethers.utils.parseUnits(valueString, decimals);

const getProvider = (network = "rinkeby") => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
  );
  return provider;
};

const initErc20Token = async (provider, network, safeAddress, tokenName) => {
  const token = tokens[network] && tokens[network][tokenName];
  const contract = new ethers.Contract(
    token.address,
    tokens.erc20Abi,
    provider
  );
  const balance = await contract.balanceOf(safeAddress);

  return {
    name: tokenName,
    contract,
    balance,
    decimals: token.decimals,
  };
};

const initIdleToken = async (provider, network, safeAddress, tokenName) => {
  const token = tokens[network] && tokens[network][tokenName];
  const contract = new ethers.Contract(token.address, tokens.idleAbi, provider);
  const balanceIdle = await contract.balanceOf(safeAddress);
  const avgAPR = await contract.getAvgAPR();
  const tokenPrice = await contract.tokenPrice();

  return {
    name: tokenName,
    contract,
    balance: balanceIdle.mul(tokenPrice),
    balanceIdle,
    avgAPR,
    decimals: token.decimals,
  };
};

export const initAllTokens = async (network, safeAddress) => {
  const provider = getProvider(network);

  const erc20Tokens = ["dai", "usdc", "usdt"];

  const idleTokens = [
    TOKEN_IDLE_MAXYIELD_DAI,
    TOKEN_IDLE_MAXYIELD_USDC,
    TOKEN_IDLE_MAXYIELD_USDT,
    TOKEN_IDLE_RISKADJUSTED_USDT,
    TOKEN_IDLE_RISKADJUSTED_DAI,
    TOKEN_IDLE_RISKADJUSTED_USDC,
  ];

  const erc20 = await Promise.all(
    erc20Tokens.map(async (tokenName) => {
      return await initErc20Token(provider, network, safeAddress, tokenName);
    })
  );

  const idle = await Promise.all(
    idleTokens.map(async (tokenName) => {
      return await initIdleToken(provider, network, safeAddress, tokenName);
    })
  );

  return erc20.concat(idle).reduce((acc, item) => {
    acc[item.name] = item;
    return acc;
  }, {});
};
