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

sleep 2s

# run the development server
setsid "$TERMINAL" -e npm run dev &

sleep 4s

# open server in browser
xdg-open http://localhost:3000/

sleep 2s

# update the smart contract address
sed -i "s/smartContractAddress = .*$/smartContractAddress = \
	'$(npx hardhat run scripts/deploy.js --network localhost \
	| sed 's/^.*: //g')'/" pages/vault.js

# test the smart contract
npm test
