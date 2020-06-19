import { ethers } from "ethers";
import * as utils from "./utils";
import { FORM_DEPOSIT, FORM_WITHDRAW } from "./const";

const testToken = {
  strategyId: "maxYield",
  tokenId: "dai",
  tokenPrice: ethers.utils.bigNumberify("0x0de7a2c23b812d04"),
  avgAPR: ethers.utils.bigNumberify("0x2879fd0f45b6d344"), // 2.92
  underlying: {
    balance: ethers.utils.bigNumberify("0x048e621450cf7aa163"), // 84.0468
    decimals: 18,
  },
  idle: {
    balance: ethers.utils.bigNumberify("0xcfc3135c9a759fed"), // 15
    decimals: 18,
  },
};

// different decimals
const testTokenUsdc = {
  strategyId: "maxYield",
  tokenId: "usdc",
  tokenPrice: ethers.utils.bigNumberify("0x0f4b5c"),
  avgAPR: ethers.utils.bigNumberify("0x30da33c43adca121"), // 3.52
  underlying: {
    balance: ethers.utils.bigNumberify("0x059aa57b"), // 94.0210
    decimals: 6,
  },
  idle: {
    balance: ethers.utils.bigNumberify("0x453a3d792933b017"), // 5
    decimals: 18,
  },
};

// not rounded deposit
const testTokenUsdt = {
  strategyId: "maxYield",
  tokenId: "usdt",
  tokenPrice: ethers.utils.bigNumberify("0x0de7a2c23b812d04"),
  avgAPR: ethers.utils.bigNumberify("0x34a393b31ce0586b"),
  underlying: {
    balance: ethers.utils.bigNumberify("0x040681c1c709188bb8"),
    decimals: 18,
  },
  idle: {
    balance: ethers.utils.bigNumberify("0x0156d5955b9bf387f7"),
    decimals: 18,
  },
};

describe("utils", () => {
  test("getIdleTokenId", () => {
    expect(utils.getIdleTokenId(testToken.strategyId, testToken.tokenId)).toBe(
      "maxYield_dai"
    );
  });

  test("formatToken", () => {
    expect(utils.formatToken(testToken.underlying)).toBe("84.04676");
    expect(utils.formatToken({ balance: "0", decimals: 18 })).toBe("0");
  });

  test("formatAPR", () => {
    expect(utils.formatAPR(testToken.avgAPR)).toBe("2.92%");
  });

  test("tokenPriceToBN", () => {
    expect(utils.tokenPriceToBN(testToken).toFixed()).toBe(
      "1.001948397218901252"
    );
    expect(utils.tokenPriceToBN(testTokenUsdc).toFixed()).toBe("1.002332");
  });

  test("depositBalanceToBN", () => {
    expect(utils.depositBalanceToBN(testToken).toFixed()).toBe(
      "15.00000000000000095847250313002091538"
    );
    expect(utils.depositBalanceToBN(testTokenUsdc).toFixed()).toBe(
      "5.00000000000000052868026"
    );
    expect(utils.depositBalanceToBN(testTokenUsdt).toFixed()).toBe(
      "24.75194839721890005471878532481859862"
    );
  });

  test("formatDepositBalance", () => {
    expect(utils.formatDepositBalance(testToken)).toBe("15");
    expect(utils.formatDepositBalance(testTokenUsdc)).toBe("5");
  });

  test("calculateMaxAmountBN", () => {
    expect(utils.calculateMaxAmountBN(FORM_DEPOSIT, testToken).toFixed()).toBe(
      "84.046761533252477283"
    );
    expect(utils.calculateMaxAmountBN(FORM_WITHDRAW, testToken).toFixed()).toBe(
      "15.00000000000000095847250313002091538"
    );

    expect(
      utils.calculateMaxAmountBN(FORM_DEPOSIT, testTokenUsdc).toFixed()
    ).toBe("94.020987");
    expect(
      utils.calculateMaxAmountBN(FORM_WITHDRAW, testTokenUsdc).toFixed()
    ).toBe("5.00000000000000052868026");

    expect(
      utils.calculateMaxAmountBN(FORM_DEPOSIT, testTokenUsdt).toFixed()
    ).toBe("74.255845191656704952");
    expect(
      utils.calculateMaxAmountBN(FORM_WITHDRAW, testTokenUsdt).toFixed()
    ).toBe("24.75194839721890005471878532481859862");
  });

  test("calculateRealAmountWei FORM_DEPOSIT", () => {
    // get maxAmount, then calculateRealAmountWei, and compare with token balance
    const maxAmountBN = utils.calculateMaxAmountBN(FORM_DEPOSIT, testToken);
    const amountWei = utils.calculateRealAmountWei(
      FORM_DEPOSIT,
      testToken,
      maxAmountBN
    );

    // make sure that numbers are the same formatted and in hex
    console.log(
      {
        amountWei: utils.formatToken(
          {
            balance: amountWei,
            decimals: testToken.underlying.decimals,
          },
          { precision: 18 }
        ),
        amountMax: utils.formatToken(testToken.underlying, { precision: 18 }),
      },
      FORM_DEPOSIT
    );

    expect(amountWei).toEqual(testToken.underlying.balance);
  });

  test("calculateRealAmountWei FORM_WITHDRAW", () => {
    const maxAmountBN = utils.calculateMaxAmountBN(FORM_WITHDRAW, testToken);
    const amountWei = utils.calculateRealAmountWei(
      FORM_WITHDRAW,
      testToken,
      maxAmountBN
    );

    // make sure that numbers are the same formatted and in hex
    console.log(
      {
        amountWei: utils.formatToken(
          { balance: amountWei, decimals: testToken.idle.decimals },
          { precision: 18 }
        ),
        amountMax: utils.formatToken(testToken.idle, { precision: 18 }),
      },
      FORM_WITHDRAW
    );

    expect(amountWei).toEqual(testToken.idle.balance);
  });
});
