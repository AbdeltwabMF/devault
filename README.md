<div align="center">
<img src="/public/devault-1024.png" width="200px" height="200px" />
</div>
<h1 align="center">Devault</h1>
<p align="center">A Blockchain-based, self-hosted, and end-to-end encrypted cloud storage.</p>

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/AbdeltwabMF/devault/graphs/commit-activity)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://devault.vercel.app/)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://devault.vercel.app/)
[![GitHub license](https://img.shields.io/github/license/AbdeltwabMF/devault.svg)](https://github.com/AbdeltwabMF/devault/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/release/AbdeltwabMF/devault.svg)](https://github.com/AbdeltwabMF/devault/releases)
[![Docker](https://badgen.net/badge/icon/docker?icon=docker&label)](https://hub.docker.com/r/abdeltwabmf/devault)
[![](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/+OeH3hX00HqxmZDc8)
[![](https://img.shields.io/badge/matrix-000000?style=for-the-badge&logo=Matrix&logoColor=white)](https://matrix.to/#/#devault-community:matrix.org)

## :tada: About the Project

`Devault` stands for DEcentralized VAULT

### :camera: Screenshots

![landpage](/public/screenshots/landpage.png)

###	:art: [Color Reference](https://coolors.co/palette/264653-2a9d8f-e9c46a-f4a261-e76f51)

### What is Devault?
Decentralized storage is one of the hottest blockchain use-cases.

## Why Decentralized Vault?
- It is a decentralized storage system that is based on blockchain.
- It encrypts data and stores it in a decentralized cloud.
- It breaks apart the users’ files and distributes them across multiple nodes on their network.
- The encryption & decryption is done on the client-side witch is make a lot of sense for the user.
- Only users who have a wallet can access the data.
- Only users who have the key can access the data.
- The smart contract is upgrade-able, so the data is never lost when there is a bug fix.
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
	- You will be asked for a password to decrypt the file.
	- The file gets decrypted and downloaded.


## :biking_man: Getting Started

### :yellow_circle: Prerequisites

#### :package: Package manager

This project uses `npm` as a package manager

```sh
pacman -S npm
```

#### :key: Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`PRIVATE_KEY`
`ROPSTEN_URL`

To generate those keys you will need to:
- 1. create infura account
- 2. create a new ethereum node
- 3. copy the private key to .env
- 4. copy ropsten url to .env

`SMART_CONTRACT_ADDRESS_ROPSTEN`

This variable will be set later by the deployment script


### :wrench: Run for development

- Clone the repo

```sh
git clone https://github.com/AbdeltwabMF/devault.git
cd devault
```

- Install dependencies

```sh
npm ci
```

- Run the development server and local blockchain node.

```sh
npm run deploy localhost
```

- Navigate to `http://localhost:3000` <br/>

:green_circle: _Now you're good to go_

#### :syringe: Run the tests

- Run the smart contracts test

```sh
npx hardhat test
```

- Generates a code coverage report for smart contracts test

```sh
npx hardhat coverage
```

- Run the whole project tests

```sh
npm run test
```

### :sparkles: Deployment | Hosting

- Deploy using source code and docker

```sh
git clone https://github.com/AbdeltwabMF/devault.git
cd devault
```

```sh
docker-compose up --build --force-recreate -d
```

- Deploy using official docker image hosted on docker hub

```sh
docker container run -p 3000:3000 -d abdeltwabmf/devault
```

- Deploy using vercel

```sh
npm i -g vercel
```

```sh
vercel --prod
```

- Deploy using static site generation

The generated static site will be in the `out` directory (ex. use `nginx` to serve it)

```sh
npm run build2
```


## :hammer_and_wrench: Tech stack and Tools

The tools used in this project.

| Icon                                                                 | Tool                                       | Description                                                                    |
|:--------------------------------------------------------------------:|:------------------------------------------:|:------------------------------------------------------------------------------:|
| <img src="/public/tools/neovim.svg" width="48px" height="48px" />    | [Neovim](https://neovim.io/)               | as an IDE                                                                      |
| <img src="/public/tools/nextdotjs.svg" width="48px" height="48px" /> | [Next.js](https://nextjs.org/)             | as a frontend framework                                                        |
| <img src="/public/tools/hardhat.png" width="48px" height="48px" />   | [Hardhat](https://hardhat.io)              | as a framework for developing, testing, linting and deploying smart contracts  |
| <img src="/public/tools/solidity.svg" width="48px" height="48px" />  | [Solidity](https://docs.soliditylang.org/) | as a smart contract language                                                   |
| <img src="/public/tools/metamask.png" width="48px" height="48px" />  | [Metamask](https://metamask.io/)           | as a web3 provider                                                             |
| <img src="/public/tools/ethereum.svg" width="48px" height="48px" />  | [Ethers.js](https://docs.ethers.io/)       | as a library for interacting with the Ethereum blockchain                      |
| <img src="/public/tools/ethereum.svg" width="48px" height="48px" />  | [Ropsten](https://ropsten.etherscan.io/)   | as a testnet for deploying smart contracts                                     |
| <img src="/public/tools/infura.png" width="48px" height="48px" />    | [Infura](https://infura.io/)               | for running a virtual blockchain node to deploy the smart contracts through it |
| <img src="/public/tools/ipfs.svg" width="48px" height="48px" />      | [IPFS](https://ipfs.io/)                   | for storing and sharing the encrypted files                                    |
| <img src="/public/tools/jest.svg" width="48px" height="48px" />      | [Jest](https://jestjs.io/)                 | for unit testing                                                               |
| <img src="/public/tools/ethereum.svg" width="48px" height="48px" />  | [Etherscan](https://etherscan.io/)         | for verifying transactions and blocks                                          |
| <img src="/public/tools/vercel.svg" width="48px" height="48px" />    | [Vercel](https://vercel.com/)              | for deploying the app for production                                           |
| <img src="/public/tools/docker.svg" width="48px" height="48px" />    | [Docker](https://www.docker.com/)          | for deploying and shipping the app for production                              |
| <img src="/public/tools/latex.svg" width="48px" height="48px" />     | [LaTeX](https://www.latex-project.org/)    | for writing the thesis and the presentation                                    |

## :bulb: FAQ

## :hearts: Community

The `Devault` community can be found on:
[Telegram](https://t.me/+OeH3hX00HqxmZDc8) or [Matrix](https://matrix.to/#/#devault-community:matrix.org)
, where you can ask questions, suggest new ideas, and get support.

## :gem: Acknowledgements

### Softwares

- [eslint](https://eslint.org/)
- [ale](https://github.com/dense-analysis/ale)
- [crypto-js](https://cryptojs.gitbook.io/docs/)

### Engineers

- [Osama El-Zero](https://www.youtube.com/c/ElzeroInfo/)
- [Web Dev Simplified](https://www.youtube.com/c/WebDevSimplified/)
- [Patrick collins](https://www.youtube.com/c/PatrickCollins/)
- [nader dabit](https://www.youtube.com/c/naderdabit/)
- [3blue1brown](https://www.youtube.com/c/3blue1brown/)
- [Savjee](https://www.youtube.com/c/Savjee/)

## :warning: License

Licensed under the [GPL-v3](LICENSE) License.
