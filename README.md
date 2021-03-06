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

## How to add new Idle asset

- Add new underlying token id and token logo in `src/const.js`.
- Add new Idle contract data (including address) to the `mainnet` array in `src/tokens.js`.
- That's it! The rest of the app will just work fine with new Idle contract and underlying ERC-20 token.

## This app development is supported by Gnosis Grant

Read more [here](https://github.com/gnosis/GECO/pull/66)

## License

Built by Kris Urbas ([@krzysu](https://twitter.com/krzysu)).

The code in this repository is available under the MIT License.
