#!/usr/bin/bash

# install long term support node.js to match the version used by hardhat.
if [[ -f "$HOME"/.config/nvm/nvm.sh ]]; then
	source "$HOME"/.config/nvm/nvm.sh
	nvm install --lts
fi

# compile the smart contracts
npx hardhat compile

case "$1" in
	"mainnet")
		network="mainnet" ;;
	"rinkeby")
		network="rinkeby" ;;
	"ropsten")
		network="ropsten" ;;
	"kovan")
		network="kovan" ;;
	*)
		network="localhost" ;;
esac

# deploy the smart contracts to the specified network
smart_contract_address=$(npx hardhat run ./scripts/deploy.js --network "$network")

# replace the address of the smart contract with the deployed address
sed -i "s/contractAddress = .*$/contractAddress = '$smart_contract_address'/" ./pages/_app.js
