#!/usr/bin/bash

# install long term support node.js
if [[ -f "$HOME"/.config/nvm/nvm.sh ]]; then
	source "$HOME"/.config/nvm/nvm.sh
	nvm install --lts
fi

# compile the smart contracts
npx hardhat compile

# run the hardhat node - local blockchain
setsid "$TERMINAL" -e npx hardhat node &

# run the development server
setsid "$TERMINAL" -e npm run dev &

# open server in browser
xdg-open http://localhost:3000/

# wait till the hardhat node is ready
sleep 10s

# update the smart contract address

  const smartContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
sed -i "s/smartContractAddress = .*$/smartContractAddress = \
	'$(npx hardhat run scripts/deploy.js --network localhost \
	| sed 's/^.*: //g')'/" pages/vault.js

# test the smart contract
npx hardhat test
npm run lint
npm test
