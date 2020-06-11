const { ethers } = require("ethers");
const uniswap = require("@studydefi/money-legos/uniswap");
const erc20 = require("@studydefi/money-legos/erc20");
const dotenv = require("dotenv");
dotenv.config();

const formatUnits = (balance, decimals = 18) =>
  ethers.utils.formatUnits(balance, decimals);

const connect = async () => {
  // local ganache
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  return new ethers.Wallet(process.env.GANACHE_PRIV_KEY, provider);
};

const swapEthToERC20 = async (amountEth, erc20Address, wallet) => {
  const uniswapFactoryContract = new ethers.Contract(
    uniswap.factory.address,
    uniswap.factory.abi,
    wallet
  );

  const exchangeAddress = await uniswapFactoryContract.getExchange(
    erc20Address
  );

  const exchangeContract = new ethers.Contract(
    exchangeAddress,
    uniswap.exchange.abi,
    wallet
  );

  await exchangeContract.ethToTokenSwapInput(
    1, // min amount of token retrieved
    2525644800, // random timestamp in the future (year 2050)
    {
      gasLimit: 4000000,
      value: ethers.utils.parseEther(amountEth),
    }
  );
};

const getERC20ToSafe = async (erc20Address, wallet) => {
  const safeAddress = process.env.SAFE_ADDRESS;
  await swapEthToERC20("1", erc20Address, wallet);
  const erc20Contract = new ethers.Contract(erc20Address, erc20.abi, wallet);
  const balanceWei = await erc20Contract.balanceOf(wallet.address);
  await erc20Contract.transfer(safeAddress, balanceWei);
  const safeBalanceWei = await erc20Contract.balanceOf(safeAddress);

  return safeBalanceWei;
};

const main = async () => {
  const wallet = await connect();

  console.log("Script started:", new Date().toLocaleTimeString());

  const safeDaiBalanceWei = await getERC20ToSafe(erc20.dai.address, wallet);
  const safeUsdcBalanceWei = await getERC20ToSafe(erc20.usdc.address, wallet);

  // send also some ETH
  await wallet.sendTransaction({
    to: process.env.SAFE_ADDRESS,
    value: ethers.utils.parseEther("1"),
  });
  await wallet.sendTransaction({
    to: process.env.METAMASK_ADDRESS,
    value: ethers.utils.parseEther("1"),
  });

  console.log(`Safe wallet:
    DAI: ${formatUnits(safeDaiBalanceWei, erc20.dai.decimals)}
    USDC: ${formatUnits(safeUsdcBalanceWei, erc20.usdc.decimals)}
  `);

  console.log("Script end:", new Date().toLocaleTimeString());
};

main();
