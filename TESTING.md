# Test with ganache mainnet fork

# How it could work but it didn't work for me so far

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
