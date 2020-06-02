import ethers from "ethers";

const formatUnits = (balance, decimals = 18) =>
  ethers.utils.formatUnits(balance, decimals);
