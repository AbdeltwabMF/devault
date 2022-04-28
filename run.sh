#!/usr/bin/bash

# install long term support node.js
source ~/.config/nvm/nvm.sh
nvm install --lts

# compile the smart contracts
npx hardhat compile

# run the development server
setsid $TERMINAL -e npm run dev &

# run the hardhat node - local blockchain
setsid $TERMINAL -e npx hardhat node &

sleep 10s

# update the smart contract address
sed -i "s/^const greeterAddress = .*$/const greeterAddress = \
	'$(npx hardhat run scripts/deploy.js --network localhost \
	| sed 's/^.*: //g')'/" pages/index.js

# test the smart contract
npx hardhat test
npm test
