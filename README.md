<div align="center">
<img src="/public/devault-1024.png" width="200px" height="200px" />
</div>
<h1 align="center">Devault</h1>
<h4 align="center">A Blockchain-based, self-hosted, and end-to-end encrypted cloud storage.</h4>

<div align="center">
    <a href="https://github.com/AbdeltwabMF/devault/graphs/commit-activity">
        <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="maintenance" />
    </a>
    <a href="https://devault.vercel.app/">
        <img src="https://img.shields.io/website-up-down-green-red/http/shields.io.svg" alt="website" />
    </a>
    <a href="https://github.com/AbdeltwabMF/devault/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/AbdeltwabMF/devault?logo=gnu&.svg" alt="license" />
    <a>
    <a href="https://github.com/AbdeltwabMF/devault/releases">
        <img src="https://img.shields.io/github/release/AbdeltwabMF/devault.svg" alt="release" />
    </a>
    <a href="https://github.com/AbdeltwabMF/devault/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/AbdeltwabMF/devault.svg" alt="contributors" />
    </a>
    <a href="http://makeapullrequest.com">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="pull-request" />
    </a>
    <a href="https://standardjs.com">
        <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="style" />
    </a>
    <a href="https://hub.docker.com/r/abdeltwabmf/devault">
        <img src="https://img.shields.io/docker/image-size/abdeltwabmf/devault/latest" alt="docker" />
    </a>
    <a href="https://github.com/AbdeltwabMF/devault">
        <img src="https://img.shields.io/github/languages/top/AbdeltwabMF/devault" alt="languages" />
    </a>
    <a href="https://github.com/AbdeltwabMF/devault/CODE_OF_CONDUCT.md">
        <img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="code-of-conduct" />
    </a>
    <a href="https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AbdeltwabMF/devault&amp;utm_campaign=Badge_Grade">
        <img src="https://app.codacy.com/project/badge/Grade/7abde45beb1a44ef858fb68e889a214e" alt="quality" />
    </a>
    <a href="https://github.com/AbdeltwabMF/devault/graphs/commit-activity">
        <img src="https://img.shields.io/github/commit-activity/w/abdeltwabmf/devault" alt="commits" />
    </a>
    <a href="https://matrix.to/#/#devault-community:matrix.org">
        <img src="https://img.shields.io/matrix/devault-community:matrix.org" alt="chat" />
    </a>
</div>

## :scroll: Table of Contents

  - [About the Project](#tada-about-the-project)
    - [Screenshots](#camera-screenshots)
    - [Color Reference](#art-color-reference)
    - [Tech stack and Tools](#hammer_and_wrench-tech-stack-and-tools)
    - [What is Devault](#microphone-what-is-devault)
    - [Why Devault](#mag-why-devault)
    - [How Devault Works](#closed_lock_with_key-how-devault-works)
  - [Source Code Directory Structure](#ladder-source-code-directory-structure)
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

## :microphone: What is Devault

Devault is a decentralized, self-hosted, end-to-end encrypted, and alternative to proprietary and centralized cloud storage. 

### :mag: Why Devault

  - It is decentralized cloud storage based on blockchain.
  - It uses client-side encryption/decryption.
  - It breaks apart the users’ files and distributes them across multiple nodes on the network.
  - The smart contract is upgradeable, so the data is never lost when there is a bug fix.
  - It prevents the data from being tampered with.
  - It prevents the censorship of the data.
  - It is open source.
  - No third party can access your files or prevent you from accessing them.

### :closed_lock_with_key: How Devault Works

When you upload a file:

  - The file gets encrypted using AES-256-CBC encryption.
  - The encrypted file is split into pieces.
  - The chunks are distributed across the network nodes.
  - The root hash will be stored in your wallet on the blockchain.

When you download a file:

  - The root hash will be retrieved from your wallet on the blockchain.
  - The root hash will be used to retrieve the file chunks.
  - The retrieved chucks will be combined and decrypted to represent the original file.

### :hammer_and_wrench: Tech Stack and Tools

The tools used in this project.

|                                                                      | Tool                                       | Description                                                                    |
|:--------------------------------------------------------------------:|:------------------------------------------:|:------------------------------------------------------------------------------:|
| <img src="/public/tools/neovim.png" width="32px" height="32px" />    | [Neovim](https://neovim.io/)               | IDE                                                                      |
| <img src="/public/tools/nextdotjs.png" width="32px" height="32px" /> | [Next.js](https://nextjs.org/)             | Full stack framework                                                        |
| <img src="/public/tools/hardhat.png" width="32px" height="32px" />   | [Hardhat](https://hardhat.io)              | Framework for developing, testing, linting and deploying smart contracts  |
| <img src="/public/tools/solidity.png" width="32px" height="32px" />  | [Solidity](https://docs.soliditylang.org/) | The smart contract language                                                   |
| <img src="/public/tools/metamask.png" width="32px" height="32px" />  | [Metamask](https://metamask.io/)           | Web3 provider                                                             |
| <img src="/public/tools/ethereum.png" width="32px" height="32px" />  | [Ethers.js](https://docs.ethers.io/)       | Library for interacting with the Ethereum blockchain                      |
| <img src="/public/tools/ethereum.png" width="32px" height="32px" />  | [Ropsten](https://ropsten.etherscan.io/)   | Testnet for deploying smart contracts                                     |
| <img src="/public/tools/infura.png" width="32px" height="32px" />    | [Infura](https://infura.io/)               | Blockchain node as a service to deploy the smart contracts through it |
| <img src="/public/tools/ipfs.png" width="32px" height="32px" />      | [IPFS](https://ipfs.io/)                   | Storing, retrieving and sharing the encrypted files                                    |
| <img src="/public/tools/jest.png" width="32px" height="32px" />      | [Jest](https://jestjs.io/)                 | Unit testing and code coverage                                                              |
| <img src="/public/tools/ethereum.png" width="32px" height="32px" />  | [Etherscan](https://etherscan.io/)         | Verifying transactions and blocks                                          |
| <img src="/public/tools/vercel.png" width="32px" height="32px" />    | [Vercel](https://vercel.com/)              | Production deployment                                           |
| <img src="/public/tools/docker.png" width="32px" height="32px" />    | [Docker](https://www.docker.com/)          | Deploying and shipping the app for production                              |

## :ladder: Source Code Directory Structure

A quick look at the top-level files and directories:

```sh
.
├── __tests__
├── artifacts
├── components
├── contracts
├── docker-compose.yml
├── Dockerfile
├── docs
├── hardhat.config.js
├── jest.config.js
├── next.config.js
├── out
├── package.json
├── pages
├── public
├── scripts
├── SECURITY.md
├── styles
├── .github
└── utils
```

  - 1. \_\_tests\_\_: contains all the unit tests
  - 2. artifacts: produced by hardhat after compiling the smart contracts and containing smart contracts ABIs.
  - 3. components: contains all the React components.
  - 4. contracts: contains all the smart contracts source code.
  - 5. docker-compose.yml: docker-compose file for serving the production build.
  - 6. Dockerfile: docker file for building and running next.js app used by docker-compose
  - 7. docs: contains all the source code documentation.
  - 8. hardhat.config.js: hardhat config file
  - 9. jest.config.js: jest config file
  - 10. next.config.js: next.js config file
  - 11. out: produced by `npm run build2` and contains a static site.
  - 12. package.json: npm package manager config file
  - 13. pages: contains all pages routes
  - 14. public: contains all the assets (ex. images, fonts...)
  - 15. scripts: contains all the scripts used to automate the development process (ex. deploy, logger...)
  - 16. SECURITY: defining which version receives updates.
  - 17. styles: contains all page styles.
  - 18. .github: contains automated workflows (CI/CD).
  - 19. utils: contains all javascript functions used by other components.

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
- 2. create a new Ethereum node
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

  - 1. Create an Ethereum wallet using [metamask](https://metamask.io/) extension.
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
  - 11. The file is now being downloaded.

## :bulb: FAQ

<details>
    <summary>Why metamask?</summary>
    <ul>
        <li>It's the most popular wallet out there, and it's the only wallet supported by the current version of devault.</li>
    </ul>
</details>

<details>
    <summary>Is it possible to upload files without ethers?</summary>
    <ul>
        <li>No, you should have some ethers to be able to write files' metadata to the blockchain.</li>
    </ul>
</details>

<details>
    <summary>What happens when I switch to another account</summary>
    <ul>
        <li>The files that is related to that account will be retrieved instead of the previous one.</li>
    </ul>
</details>

## Future Work

  - [ ] Secure file sharing.
  - [x] Client-side encryption/decryption.
  - [x] Download a file.
  - [x] Upload a file.
  - [ ] Delete selected files.
  - [ ] Search files.
  - [ ] Sort files based on (date, size, name...)
  - [ ] Upload files.
  - [ ] Download selected files.

## :hearts: Community

The `Devault` community can be found on:

  - [Telegram](https://t.me/+OeH3hX00HqxmZDc8)
  - [Matrix](https://matrix.to/#/#devault-community:matrix.org)

Where you can ask questions, suggest new ideas, and get support.

## :gem: Acknowledgements

### Softwares

  - [eslint](https://eslint.org/)
  - [ale](https://github.com/dense-analysis/ale)
  - [remix](https://remix.ethereum.org/)

### Engineers

  - [Osama El-Zero](https://www.youtube.com/c/ElzeroInfo/)
  - [Web Dev Simplified](https://www.youtube.com/c/WebDevSimplified/)
  - [Patrick Collins](https://www.youtube.com/c/PatrickCollins/) 
  - [3blue1brown](https://www.youtube.com/c/3blue1brown/)
  - [Savjee](https://www.youtube.com/c/Savjee/)

## Tutorials

<details>
    <summary>Videos</summary>
    <ul>
        <li><a href="https://www.youtube.com/watch?v=gyMwXuJrbJQ">Learn Blockchain, Solidity, and Full Stack Web3 Development with JavaScript</a></li>
        <li><a href="https://www.youtube.com/watch?v=bdXJmWajZRY">Upgrading your Smart Contracts | A Tutorial & Introduction</a></li>
        <li><a href="https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv">Learn JavaScript in Arabic 2021</a></li>
        <li><a href="https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h">React Hooks</a></li>
        <li><a href="https://www.youtube.com/playlist?list=PLzvRQMJ9HDiQF_5bEErheiAawrJ-2zQoI">Blockchain & Cryptocurrency</a></li>
        <li><a href="https://www.youtube.com/playlist?list=PLzvRQMJ9HDiSM_uLyxy5B6ml_BpmLFAHU">Decentralized tech</a></li>
    </ul>
</details>

<details>
    <summary>Articles & Documentations</summary>
    <ul>
        <li><a href="https://ethereum.org/en/developers/docs/">Ethereum Official Documentation</a></li>
        <li><a href="https://cryptozombies.io/">Cryptozombies</a></li>
    </ul>
</details>

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
