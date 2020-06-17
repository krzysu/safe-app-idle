import erc20Mainnet from "@studydefi/money-legos/erc20";
import idleMainnet from "@studydefi/money-legos/idle";

import daiSrc from "./assets/dai.svg";
import usdcSrc from "./assets/usdc.svg";
import usdtSrc from "./assets/usdt.svg";
import susdSrc from "./assets/susd.svg";
import tusdSrc from "./assets/tusd.svg";
import wbtcSrc from "./assets/wbtc.svg";

import { STRATEGY_MAXYIELD, STRATEGY_RISKADJUSTED } from "./const";

const buildTokenData = (strategyId) => (tokenId, logo) => (address) => ({
  address,
  decimals: idleMainnet.decimals,
  logo,
  strategyId,
  tokenId,
});

const buildMaxYield = buildTokenData(STRATEGY_MAXYIELD);
const buildMaxYieldDai = buildMaxYield("dai", daiSrc);
const buildMaxYieldUsdc = buildMaxYield("usdc", usdcSrc);
const buildMaxYieldUsdt = buildMaxYield("usdt", usdtSrc);
const buildMaxYieldSusd = buildMaxYield("susd", susdSrc);
const buildMaxYieldTusd = buildMaxYield("tusd", tusdSrc);
const buildMaxYieldWbtc = buildMaxYield("wbtc", wbtcSrc);

const buildRiskAdjusted = buildTokenData(STRATEGY_RISKADJUSTED);
const buildRiskAdjustedDai = buildRiskAdjusted("dai", daiSrc);
const buildRiskAdjustedUsdc = buildRiskAdjusted("usdc", usdcSrc);
const buildRiskAdjustedUsdt = buildRiskAdjusted("usdt", usdtSrc);

const mainnet = [
  buildMaxYieldDai(idleMainnet.maxYield.dai.address),
  buildMaxYieldUsdc(idleMainnet.maxYield.usdc.address),
  buildMaxYieldUsdt(idleMainnet.maxYield.usdt.address),
  buildMaxYieldSusd("0xb39ca0261a1b2986a6a9Fe38d344B56374963dE5"),
  buildMaxYieldTusd("0x7DB7A4a50b26602E56536189Aa94678C80F8E5b6"),
  buildMaxYieldWbtc("0xD6f279B7ccBCD70F8be439d25B9Df93AEb60eC55"),
  buildRiskAdjustedDai(idleMainnet.riskAdjusted.dai.address),
  buildRiskAdjustedUsdc(idleMainnet.riskAdjusted.usdc.address),
  buildRiskAdjustedUsdt(idleMainnet.riskAdjusted.usdt.address),
];

// I deployed a few Idle mocked contracts on rinkeby
const rinkeby = [
  buildMaxYieldDai("0xb20567b77AF55Cd4462941Eb9c9F2bFd734dF84f"),
  buildMaxYieldUsdc("0x7C5E9E8f8Cedba477Efd1eA461aB2e54684C9897"),
  buildMaxYieldUsdt("0x728d6b9940F74B23CAa86a6afA7ea05Cc9d8A51F"),
  buildMaxYieldSusd("0x728d6b9940F74B23CAa86a6afA7ea05Cc9d8A51F"),
  buildMaxYieldTusd("0x728d6b9940F74B23CAa86a6afA7ea05Cc9d8A51F"),
  buildMaxYieldWbtc("0x728d6b9940F74B23CAa86a6afA7ea05Cc9d8A51F"),
  buildRiskAdjustedDai("0xb20567b77AF55Cd4462941Eb9c9F2bFd734dF84f"),
  buildRiskAdjustedUsdc("0x7C5E9E8f8Cedba477Efd1eA461aB2e54684C9897"),
  buildRiskAdjustedUsdt("0x728d6b9940F74B23CAa86a6afA7ea05Cc9d8A51F"),
];

export default {
  mainnet,
  rinkeby,
  erc20Abi: erc20Mainnet.abi,
  idleAbi: idleMainnet.abi,
};
