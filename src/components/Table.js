import React from "react";
import { Button, Text } from "@gnosis.pm/safe-react-components";
import { formatUnits, formatAPR } from "../utils";

import styles from "./Table.module.css";

/* const tokens = {
    logo: usdtSrc,
    erc20: usdt,
    idle: idleMaxYieldUsdt,
    strategyId
}
*/

const Table = ({ iconSrc, title, tokens, onDepositClick, onWithdrawClick }) => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <img src={iconSrc} alt={title} className={styles.logo} />
        <Text size="xl" className={styles.title}>
          {title}
        </Text>
      </div>
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
            <tr key={token.erc20.name}>
              <td className={styles.tokenNameCol}>
                <div className={styles.tokenName}>
                  <img
                    src={token.logo}
                    alt={token.erc20.name}
                    className={styles.logo}
                  />
                  <Text size="lg">{token.erc20.name.toUpperCase()}</Text>
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
                      onClick={onDepositClick(
                        token.erc20.name,
                        token.strategyId
                      )}
                    >
                      Deposit
                    </Button>
                  </div>
                  <div className={styles.buttonWrap}>
                    <Button
                      size="md"
                      color="secondary"
                      variant="contained"
                      onClick={onWithdrawClick}
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
    </React.Fragment>
  );
};

export default Table;
