import { ethers } from "ethers";
import tokens, {
  TOKEN_IDLE_MAXYIELD_DAI,
  TOKEN_IDLE_MAXYIELD_USDC,
  TOKEN_IDLE_MAXYIELD_USDT,
  TOKEN_IDLE_RISKADJUSTED_USDT,
  TOKEN_IDLE_RISKADJUSTED_DAI,
  TOKEN_IDLE_RISKADJUSTED_USDC,
} from "./tokens";

export const formatUnits = (balance = "0", decimals = 18) =>
  ethers.utils.formatUnits(balance, decimals);

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
  const balance = await contract.balanceOf(safeAddress);
  const avgAPR = await contract.getAvgAPR();

  return {
    name: tokenName,
    contract,
    balance,
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
