#!/usr/bin/bash

# install long term support node.js
if [[ -f "$HOME"/.config/nvm/nvm.sh ]]; then
	source "$HOME"/.config/nvm/nvm.sh
	nvm install --lts
fi

# compile the smart contracts
npx hardhat clean
npx hardhat compile

# run the hardhat node - local blockchain
setsid "$TERMINAL" -e npx hardhat node &

# update the smart contract address
network=$(awk -F= '/NETWORK/ {print $2}' .env)
sleep 10s
smart_contract_address=$(npx hardhat run scripts/deploy.js --network "$network")
sed -i "s/SMART_CONTRACT_ADDRESS=.*$/SMART_CONTRACT_ADDRESS='$smart_contract_address'/" .env
sed -i "s/smartContractAddress = .*$/smartContractAddress = '$smart_contract_address'/" pages/vault.js

sleep 4s

# run the development server
setsid "$TERMINAL" -e npm run dev &

sleep 2s

# open server in browser
xdg-open http://localhost:3000/

# test the smart contract
npm test
