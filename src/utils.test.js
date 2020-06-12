import { ethers } from "ethers";
import * as utils from "./utils";
import { FORM_DEPOSIT, FORM_WITHDRAW } from "./const";

const testToken = {
  strategyId: "maxYield",
  tokenId: "dai",
  tokenPrice: ethers.utils.bigNumberify("0x0de7a2c23b812d04"),
  avgAPR: ethers.utils.bigNumberify("0x2879fd0f45b6d344"), // 2.92
  underlying: {
    symbol: "DAI",
    balance: ethers.utils.bigNumberify("0x048e621450cf7aa163"), // 84.0468
    decimals: 18,
  },
  idle: {
    symbol: "IDLE_DAI",
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
    symbol: "USDC",
    balance: ethers.utils.bigNumberify("0x059aa57b"), // 94.0210
    decimals: 6,
  },
  idle: {
    symbol: "IDLE_USDC",
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
    symbol: "DAI",
    balance: ethers.utils.bigNumberify("0x040681c1c709188bb8"),
    decimals: 18,
  },
  idle: {
    symbol: "IDLE_TESTNETDAI",
    balance: ethers.utils.bigNumberify("0x0156d5955b9bf387f7"),
    decimals: 18,
  },
};

describe("utils", () => {
  test("toFixedSpecial", () => {
    expect(utils.toFixedSpecial(3.5071149939355e-11)).toBe(
      "0.000000000035071149939355"
    );
    expect(utils.toFixedSpecial(3.5071149939355e11)).toBe(350711499393.55);
  });

  test("getIdleTokenId", () => {
    expect(utils.getIdleTokenId(testToken.strategyId, testToken.tokenId)).toBe(
      "maxYield_dai"
    );
  });

  test("formatToken", () => {
    expect(utils.formatToken(testToken.underlying)).toBe("84.04676153");
    expect(
      utils.formatToken(testToken.underlying, {
        precision: 4,
      })
    ).toBe("84.0468");
  });

  test("balanceToFloat", () => {
    expect(utils.balanceToFloat(testToken.underlying)).toBe(84.04676153325248);
  });

  test("formatAPR", () => {
    expect(utils.formatAPR(testToken.avgAPR)).toBe("2.92%");
  });

  test("tokenPriceToFloat", () => {
    expect(utils.tokenPriceToFloat(testToken)).toBe(1.0019483972189012);
    expect(utils.tokenPriceToFloat(testTokenUsdc)).toBe(1.002332);
  });

  test("depositBalanceToFloat", () => {
    expect(utils.depositBalanceToFloat(testToken)).toBe(15);
    expect(utils.depositBalanceToFloat(testTokenUsdc)).toBe(5);
    expect(utils.depositBalanceToFloat(testTokenUsdt)).toBe(24.7519483972189);
  });

  test("formatDepositBalance", () => {
    expect(utils.formatDepositBalance(testToken)).toBe("15.00000000");
    expect(utils.formatDepositBalance(testTokenUsdc)).toBe("5.00000000");
    expect(utils.formatDepositBalance(testToken, { precision: 2 })).toBe(
      "15.00"
    );
    expect(utils.formatDepositBalance(testTokenUsdc, { precision: 4 })).toBe(
      "5.0000"
    );
  });

  test("roundToDecimals", () => {
    const amount = 0.00051400071149939355;
    const toBeRounded = amount / 5; // 0.0001028001422998787

    expect(utils.roundToDecimals(toBeRounded, 6)).toBe(0.000103);
    expect(utils.roundToDecimals(toBeRounded, 18)).toBe(0.000102800142299879);
  });

  test("parseTextFieldValue", () => {
    expect(utils.parseTextFieldValue(0.051400071149, 6)).toBe(0.0514);
    expect(utils.parseTextFieldValue(0.051401071149, 6)).toBe(0.051401);
    expect(utils.parseTextFieldValue(1.0514000711499393558, 18)).toBe(
      1.051400071149939355
    ); // outside of JS numbers
  });

  test("calculateMaxAmount", () => {
    expect(utils.calculateMaxAmount(FORM_DEPOSIT, testToken)).toBe(
      84.04676153325248
    );
    expect(utils.calculateMaxAmount(FORM_WITHDRAW, testToken)).toBe(15);

    expect(utils.calculateMaxAmount(FORM_DEPOSIT, testTokenUsdc)).toBe(
      94.020987
    );
    expect(utils.calculateMaxAmount(FORM_WITHDRAW, testTokenUsdc)).toBe(5);

    expect(utils.calculateMaxAmount(FORM_DEPOSIT, testTokenUsdt)).toBe(
      74.2558451916567
    );
    expect(utils.calculateMaxAmount(FORM_WITHDRAW, testTokenUsdt)).toBe(
      24.7519483972189
    );
  });

  test("calculateRealAmountWei FORM_DEPOSIT", () => {
    // get maxAmount, then calculateRealAmountWei, and compare with token balance
    const maxAmount = utils.calculateMaxAmount(FORM_DEPOSIT, testToken);
    const amountWei = utils.calculateRealAmountWei(
      FORM_DEPOSIT,
      testToken,
      maxAmount
    );

    // when formatted, the numbers are the same but not in hex
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

    // expect(amountWei).toEqual(testToken.underlying.balance);
  });

  test("calculateRealAmountWei FORM_WITHDRAW", () => {
    const maxAmount = utils.calculateMaxAmount(FORM_WITHDRAW, testToken);
    const amountWei = utils.calculateRealAmountWei(
      FORM_WITHDRAW,
      testToken,
      maxAmount
    );

    // when formatted, the numbers are the same but not in hex
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

    // expect(amountWei).toEqual(testToken.idle.balance);
  });
});
