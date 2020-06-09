import { ethers } from "ethers";
import tokens from "./tokens";
import { getIdleTokenId } from "./utils";

const getProvider = (network = "rinkeby") => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
  );
  return provider;
};

const initToken = async (provider, safeAddress, token) => {
  /*
    const token = {
      address,
      decimals,
      logo,
      strategyId,
      tokenId,
    };
  */

  const idleContract = new ethers.Contract(
    token.address,
    tokens.idleAbi,
    provider
  );
  const idleBalance = await idleContract.balanceOf(safeAddress);
  const avgAPR = await idleContract.getAvgAPR();
  const tokenPrice = await idleContract.tokenPrice();
  const idleSymbol = await idleContract.symbol();
  const underAddress = await idleContract.token();

  const underContract = new ethers.Contract(
    underAddress,
    tokens.erc20Abi,
    provider
  );
  const underBalance = await underContract.balanceOf(safeAddress);
  const underDecimals = await underContract.decimals();
  const underSymbol = await underContract.symbol();

  return {
    ...token,
    tokenPrice,
    avgAPR,
    underlying: {
      symbol: underSymbol,
      contract: underContract,
      balance: underBalance,
      decimals: underDecimals,
    },
    idle: {
      symbol: idleSymbol, // is it in use?
      contract: idleContract,
      balance: idleBalance,
      decimals: token.decimals,
    },
  };
};

export const initAllTokens = async (network, safeAddress) => {
  const provider = getProvider(network);
  const networkTokens = tokens[network];

  const result = await Promise.all(
    networkTokens.map(async (token) => {
      return await initToken(provider, safeAddress, token);
    })
  );

  return result.reduce((acc, item) => {
    acc[getIdleTokenId(item.strategyId, item.tokenId)] = item;
    return acc;
  }, {});
};
