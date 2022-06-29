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


## :scroll: Table of Contents

- [About the Project](#tada-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Color Reference](#art-color-reference)
  - [Tech stack and Tools](#hammer_and_wrench-tech-stack-and-tools)
  - [What is Devault](#microphone-what-is-devault)
  - [Why Devault](#mag-why-devault)
  - [How Devault Works](#closed_lock_with_key-how-devault-works)
- [Getting Started](#biking_man-getting-started)
  - [Prerequisites](#yellow_circle-prerequisites)
    - [Package Manager](#package-package-manager)
    - [Environment Variables](#key-environment-variables)
  - [Run for Development](#wrench-run-for-development)
    - [Run the Tests](#syringe-run-the-tests)
  - [Deployment | Hosting](#sparkles-deployment--hosting)
- [Usage](#thinking-usage)
- [FAQ](#bulb-faq)
- [Community](#hearts-community)
- [Acknowledgements](#gem-acknowledgements)
- [Contributors](#hatching_chick-contributors)
- [License](#warning-license)

  
## :tada: About the Project

`Devault` stands for DEcentralized VAULT

### :camera: Screenshots

|                                               |                                               |
|:---------------------------------------------:|:---------------------------------------------:|
| ![landpage](/public/screenshots/landpage.png) | ![landpage](/public/screenshots/thevault.png) |



###	:art: [Color Reference](https://coolors.co/palette/264653-2a9d8f-e9c46a-f4a261-e76f51)

### :microphone: What is Devault?

Devault is a decentralized, self-hosted, end-to-end encrypted, and alternative to proprietary and centralized cloud storage. 


### :mag: Why Devault?

- It is decentralized cloud storage based on blockchain.
- It uses client-side encryption/decryption.
- It breaks apart the users’ files and distributes them across multiple nodes on the network.
- The smart contract is upgradeable, so the data is never lost when there is a bug fix.
- It prevents the data from being tampered with.
- It prevents the censorship of the data.
- It is open source.
- No third party can access your files or prevent you from accessing them.

### :closed_lock_with_key: How Devault Works?

When you upload a file:

- The file gets encrypted using AES-256-CBC encryption.
- The encrypted file split into pieces.
- The chunks are distributed across the network nodes.
- The root hash will be stored in the your wallet on the blockchain.

When you download a file:

- The root hash will be retrieved from your wallet on the blockchain.
- The root hash will be used to retrieve the file chunks.
- The retrieved chucks will be combined and decrypted to represent the original file.

### :hammer_and_wrench: Tech Stack and Tools

The tools used in this project.

|                                                                      | Tool                                       | Description                                                                    |
|:--------------------------------------------------------------------:|:------------------------------------------:|:------------------------------------------------------------------------------:|
| <img src="/public/tools/neovim.png" width="32px" height="32px" />    | [Neovim](https://neovim.io/)               | as an IDE                                                                      |
| <img src="/public/tools/nextdotjs.png" width="32px" height="32px" /> | [Next.js](https://nextjs.org/)             | as a frontend framework                                                        |
| <img src="/public/tools/hardhat.png" width="32px" height="32px" />   | [Hardhat](https://hardhat.io)              | as a framework for developing, testing, linting and deploying smart contracts  |
| <img src="/public/tools/solidity.png" width="32px" height="32px" />  | [Solidity](https://docs.soliditylang.org/) | as a smart contract language                                                   |
| <img src="/public/tools/metamask.png" width="32px" height="32px" />  | [Metamask](https://metamask.io/)           | as a web3 provider                                                             |
| <img src="/public/tools/ethereum.png" width="32px" height="32px" />  | [Ethers.js](https://docs.ethers.io/)       | as a library for interacting with the Ethereum blockchain                      |
| <img src="/public/tools/ethereum.png" width="32px" height="32px" />  | [Ropsten](https://ropsten.etherscan.io/)   | as a testnet for deploying smart contracts                                     |
| <img src="/public/tools/infura.png" width="32px" height="32px" />    | [Infura](https://infura.io/)               | for running a virtual blockchain node to deploy the smart contracts through it |
| <img src="/public/tools/ipfs.png" width="32px" height="32px" />      | [IPFS](https://ipfs.io/)                   | for storing and sharing the encrypted files                                    |
| <img src="/public/tools/jest.png" width="32px" height="32px" />      | [Jest](https://jestjs.io/)                 | for unit testing                                                               |
| <img src="/public/tools/ethereum.png" width="32px" height="32px" />  | [Etherscan](https://etherscan.io/)         | for verifying transactions and blocks                                          |
| <img src="/public/tools/vercel.png" width="32px" height="32px" />    | [Vercel](https://vercel.com/)              | for deploying the app for production                                           |
| <img src="/public/tools/docker.png" width="32px" height="32px" />    | [Docker](https://www.docker.com/)          | for deploying and shipping the app for production                              |
| <img src="/public/tools/latex.png" width="32px" height="32px" />     | [LaTeX](https://www.latex-project.org/)    | for writing the thesis and the presentation                                    |

## :biking_man: Getting Started

### :yellow_circle: Prerequisites

#### :package: Package Manager

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


### :wrench: Run for Development

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

#### :syringe: Run the Tests

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

## :thinking: Usage

- 1. Create an ethereum wallet using [metamask](https://metamask.io/) extension.
- 2. Open [devault website](https://devault.vercel.app/).
- 3. Click connect wallet and follow the steps.
- 4. <details>
       <summary>Make sure you're on the ropsten network. (settings > advanced > show test networks)</summary>
       <ul>
        <li><img src="/public/screenshots/metamask-ropsten.png" /></li>
       </ul>
     </details>
- 5. <details>
       <summary>Go to <a href="https://faucet.egorfine.com/">ropsten faucet</a> and paste your address to get some ethers. (used for transactions)</summary>
       <ul>
        <li><img src="/public/screenshots/faucet.png" /></li>
       </ul>
     </details>
- 6. Navigate to [The Vault](https://devault.vercel.app/vault) tab.
- 7. Pick a file and press upload.
- 8. Give a passphrase to encrypt the file. (you can use different passphrases for different files).
- 9. Once the file is successfully uploaded it will appear on the same page with the option to download.
- 10. When downloading give the same passphrase you entered when uploading the file.
- 11. The file now being downloaded.

## :bulb: FAQ

## :hearts: Community

The `Devault` community can be found on:

- [Telegram](https://t.me/+OeH3hX00HqxmZDc8)
- [Matrix](https://matrix.to/#/#devault-community:matrix.org)

Where you can ask questions, suggest new ideas, and get support.

## :gem: Acknowledgements

### Softwares

- [eslint](https://eslint.org/)
- [ale](https://github.com/dense-analysis/ale)
- [crypto-js](https://cryptojs.gitbook.io/docs/)
- [bootstrap](https://getbootstrap.com/)
- [remix](https://remix.ethereum.org/)

### Engineers

- [Osama El-Zero](https://www.youtube.com/c/ElzeroInfo/)
- [Web Dev Simplified](https://www.youtube.com/c/WebDevSimplified/)
- [Patrick Collins](https://www.youtube.com/c/PatrickCollins/)
- [Nader Dabit](https://www.youtube.com/c/naderdabit/)
- [3blue1brown](https://www.youtube.com/c/3blue1brown/)
- [Savjee](https://www.youtube.com/c/Savjee/)
- [Design Course](https://www.youtube.com/c/DesignCourse/)
- [Codographia](https://www.youtube.com/c/Codographia)

## :hatching_chick: Contributors

<table>
  <tr>
    <td align="center">
        <a href="https://abdeltwabmf.github.io">
        <img src="https://avatars.githubusercontent.com/u/55063723?v=3?s=100" width="100px;" alt="Abdeltwabmf"/><br />
            <sub><b>Abd El-Twab M. Fakhry</b></sub>
        </a>
    </td>
  </tr>
</table>

## :warning: License

Licensed under the [GPL-v3](LICENSE) License.
