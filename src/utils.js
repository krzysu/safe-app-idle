import { ethers } from "ethers";
import erc20 from "./erc20";

export const getProvider = (network = "rinkeby") => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
  );
  return provider;
};

export const formatUnits = (balance, decimals = 18) =>
  ethers.utils.formatUnits(balance, decimals);

export const getToken = async (network, safeAddress, tokenName) => {
  const token = erc20[network] && erc20[network][tokenName];
  const provider = getProvider(network);

  const contract = new ethers.Contract(token.address, erc20.abi, provider);
  const balance = await contract.balanceOf(safeAddress);

  return {
    [tokenName]: {
      contract,
      balance,
      decimals: token.decimals,
    },
  };
};
