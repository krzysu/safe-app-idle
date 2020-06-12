# Gnosis Safe App for Idle Finance

## How to start the app localy

Set env variables, you will need Infura Project Id

```
cp .env.examples .env
```

Install dependencies and start local dev server

```
yarn install
yarn start
```

Then:

- Go to Rinkeby version of Gnosis Safe [https://rinkeby.gnosis-safe.io/app](https://rinkeby.gnosis-safe.io/app)
- Create your test safe
- Go to Apps -> Manage Apps -> Add Custom App
- Paste your localhost url, default is http://localhost:3003/
- Enjoy Idle Safe App

The Rinkeby version of this Safe App is configured to work with Mocked IdleV3 Contracts I deployed myself. See them [here](https://github.com/krzysu/idle-contract-mock).

They work with these Rinkeby ERC20 tokens:

- Compound DAI
  - Rinkeby address 0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea
  - Faucet - how to get test ERC20, read here https://ethereum.stackexchange.com/questions/72388/does-rinkeby-have-a-faucet-where-i-can-fill-a-wallet-with-dai
- Compound USDC
  - Rinkeby address 0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b
  - Faucet - read here https://ethereum.stackexchange.com/questions/72388/does-rinkeby-have-a-faucet-where-i-can-fill-a-wallet-with-dai
- TestnetDAI - In the app presented as USDT
  - Rinkeby address 0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8
  - You can mint them yourself using Etherscan

## How it could work to test with ganache mainnet fork (but it didn't work for me so far)

Start local mainnet fork, you need Infura Project Id

```
yarn ganache:fork https://mainnet.infura.io/v3/INFURA_PROJECT_ID
```

Add new network in MetaMask.

- Network Name: `Mainnet Fork`
- New RPC URL: `http://127.0.0.1:8545`
- ChainID: `1`

You need to have a MetaMask account with some mainnet ETH or use one of the accounts provided by Ganache.

Go to Gnosis Safe on Mainnet: [https://gnosis-safe.io/app](https://gnosis-safe.io/app)

Create new Safe. Transfer some DAI, USDC and USDT to your new Safe. **Make sure that you are connected to Mainnet Fork all the time.**

You can use script I prepared. Just configure proper env vars first.

```
node scripts/getFunds.js
```

Connect local version of Idle Safe App with Mainnet Fork Gnosis Safe.

To make the process faster you can first create a Safe on Mainnet, add some real funds there, and then just test transactions on the Mainnet Fork.

## Still to do

- test on mainnet
- improve README
