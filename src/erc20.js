import abi from "abi/erc20.json";

const mainnet = {
  dai: {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18,
  },
  usdc: {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  usdt: {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
  },
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
};

export default {
  mainnet,
  rinkeby,
  abi,
};
