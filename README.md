<div align="center">
<img src="/public/devault-1024.png" width="200px" height="200px" />
</div>
<h1 align="center">Devault</h1>
<p align="center">A Blockchain-based self-hosted decentralized encrypted cloud storage.</p>

## What is Decentralized Vault?
Decentralized storage is one of the hottest blockchain use-cases.

## Why Decentralized Vault?
- It is a decentralized storage system that is based on blockchain.
- It encrypts data and stores it in a decentralized cloud.
- It breaks apart the users’ files and distributes them across multiple nodes on their network.
- The encryption & decryption is done on the client-side witch is make a lot of sense for the user.
- Only users who have a wallet can access the data.
- Only users who have the key can access the data.
- The smart contract is upgradable, so the data is never lost when there is a bug fix.
- It prevents the data from being tampered with.
- It prevents the censorship of the data.
- It is open source.

## How Decentralized Vault Works?
- First: create a wallet.
	- The wallet is a private key that is used to sign transactions.
	- we use [metamask](https://metamask.io/) as a web3 provider. So you can use metamask to create a wallet and start using decentralized vault.
- Second: connect the wallet to the application.
  - through the connect wallet button.
- Third: upload files.
	- You will be asked for a password to encrypt the file with.
	- Then your file is split into smaller chunks, cryptographically hashed, and given a unique fingerprint called a content identifier (CID).
	- The chunks distributed to multiple nodes on the network.
- Fourth: download files.
	- The file will be reconstructed from the chunks.
	- You will be asked for a password to decrypt the file with.
	- The file gets decrypted and downloaded.

## Run The Production Build

```bash
git clone https://github.com/AbdeltwabMF/devault.git
cd devault
docker-compose up --build --force-recreate
```

## Run The Development Environment

This will run:
- The development server on port 3000.
- A local blockchain node on port 8545.

```bash
git clone https://github.com/AbdeltwabMF/devault.git
cd devault
npm ci
npm run deploy localhost
```

## The Tools Used In This Project

- [Neovim](https://neovim.io/): as an IDE.
- [Next.js](https://nextjs.org/): as a frontend framework.
- [Hardhat](https://hardhat.io): as a framework for developing, testing, linting and deploying smart contracts.
- [Solidity](https://docs.soliditylang.org/): as a smart contract language.
- [Metamask](https://metamask.io/): as a web3 provider.
- [Ethers.js](https://docs.ethers.io/): as a library for interacting with the Ethereum blockchain.
- [Ropsten](https://ropsten.etherscan.io/): as a testnet for deploying smart contracts.
- [Infura](https://infura.io/): for running a virtual blockchain node to deploy the smart contracts through it.
- [IPFS](https://ipfs.io/): for storing and sharing the encrypted files.
- [Jest](https://jestjs.io/): for unit testing.
- [Etherscan](https://etherscan.io/): for verifying transactions and blocks.
- [Vercel](https://vercel.com/): for deploying the app for production.
- [Docker](https://www.docker.com/): for deploying and shipping the app for production.
- [LaTeX](https://www.latex-project.org/): for writing the thesis and the presentation.

## Community

The `Devault` community can be found on [Telegram](https://t.me/+OeH3hX00HqxmZDc8), where you can ask questions, suggest new ideas, and get support.

## License
Licensed under the [GPL-v3](LICENSE) License.
