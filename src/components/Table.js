import React from "react";
import { Button, Text } from "@gnosis.pm/safe-react-components";
import { formatUnits, formatAPR } from "../utils";

import styles from "./Table.module.css";

/* const tokens = {
    name: "usdt",
    logo: usdtSrc,
    erc20: usdt,
    idle: idleMaxYieldUsdt,
}
*/

const Table = ({ title, tokens, onDeposit, onWithdraw }) => {
  return (
    <div className={styles.component}>
      <Text size="xl" className={styles.title}>
        {title}
      </Text>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>
              <Text size="lg">Wallet balance</Text>
            </th>
            <th>
              <Text size="lg">Deposit balance</Text>
            </th>
            <th>
              <Text size="lg">APR</Text>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name}>
              <td className={styles.tokenNameCol}>
                <div className={styles.tokenName}>
                  <img
                    src={token.logo}
                    alt={token.name}
                    className={styles.logo}
                  />
                  <Text size="lg">{token.name.toUpperCase()}</Text>
                </div>
              </td>
              <td>
                <Text size="lg">
                  {formatUnits(token.erc20.balance, token.erc20.decimals)}
                </Text>
              </td>
              <td>
                <Text size="lg">
                  {formatUnits(token.idle.balance, token.idle.decimals)}
                </Text>
              </td>
              <td>
                <Text size="lg">{formatAPR(token.idle.avgAPR)}</Text>
              </td>
              <td>
                <div className={styles.buttons}>
                  <div className={styles.buttonWrap}>
                    <Button
                      size="md"
                      color="primary"
                      variant="contained"
                      onClick={onDeposit(token.erc20, token.idle, "1")}
                      disabled
                    >
                      Deposit
                    </Button>
                  </div>
                  <div className={styles.buttonWrap}>
                    <Button
                      size="md"
                      color="secondary"
                      variant="contained"
                      onClick={onWithdraw(token.idle)}
                      disabled
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
