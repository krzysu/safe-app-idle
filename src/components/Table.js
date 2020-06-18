import React from "react";
import { Button, Text } from "@gnosis.pm/safe-react-components";
import { formatToken, formatAPR, formatDepositBalance } from "../utils";

import styles from "./Table.module.css";

/* 
  const token = {
    address: "",
    decimals: "",
    logo: "",
    strategyId: "",
    tokenId: "",

    tokenPrice: "",
    avgAPR: "",
    underlying: {
      symbol: "",
      contract: "",
      balance: "",
      decimals: "",
    },
    idle: {
      symbol: "",
      contract: "",
      balance: "",
      decimals: "",
    },
  }
*/

const hasZeroBalance = (token) => token.balance.eq(0);

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
            <tr key={token.tokenId}>
              <td className={styles.tokenNameCol}>
                <div className={styles.tokenName}>
                  <img
                    src={token.logo}
                    alt={token.tokenId}
                    className={styles.logo}
                  />
                  <Text size="lg">{token.tokenId.toUpperCase()}</Text>
                </div>
              </td>
              <td>
                <Text size="lg">
                  {formatToken(token.underlying, {
                    precision: 5,
                  })}
                </Text>
              </td>
              <td>
                <Text size="lg">
                  {formatDepositBalance(token, { precision: 5 })}
                </Text>
              </td>
              <td>
                <Text size="lg">{formatAPR(token.avgAPR)}</Text>
              </td>
              <td>
                <div className={styles.buttons}>
                  <div className={styles.buttonWrap}>
                    <Button
                      size="md"
                      color="primary"
                      variant="contained"
                      disabled={hasZeroBalance(token.underlying)}
                      onClick={onDepositClick(token.tokenId, token.strategyId)}
                    >
                      Deposit
                    </Button>
                  </div>
                  <div className={styles.buttonWrap}>
                    <Button
                      size="md"
                      color="secondary"
                      variant="contained"
                      disabled={hasZeroBalance(token.idle)}
                      onClick={onWithdrawClick(token.tokenId, token.strategyId)}
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
