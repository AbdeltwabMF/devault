#!/usr/bin/bash
#
# Deploy the smart contract to given blockchain network
# @param $1 is the network you want to deploy to
# @param $2 redeploy flag which is 1 or 0
# @author Abd El-Twab M. Fakhry <abdeltwab.m.fakhry <at> gmail <dot> com>
# @date Jun. 2022

if [[ -f ./scripts/logger.sh ]]; then
	source ./scripts/logger.sh
fi

install_nvm() {
	export XDG_CONFIG_HOME=$HOME/.config
	unset npm_config_prefix
	curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
}

# install long term support node.js to match the version supported by hardhat.
# this require you to install nvm first
# and put it under the following path: $HOME/.config/nvm/
install_nvm >/dev/null 2>&1

if [[ -f "$HOME"/.config/nvm/nvm.sh ]]; then
	source "$HOME"/.config/nvm/nvm.sh
	info "NVM is installed and loaded"
	nvm install --lts >/dev/null 2>&1
	info "Now using node $(node -v) (npm $(npm -v))"
else
	error "Couldn't install NVM, check the network"
	info "Install nvm manually first, so that it can install the supported version of node."
	exit 1
fi

start_services() {
	# start local blockchain node
	info "Starting a local blockchain node..."
	setsid "$TERMINAL" -e npx hardhat node >/dev/null 2>&1 &

	# run the development server
	info "Starting the development server running on port (3000)..."
	setsid "$TERMINAL" -e npm run dev >/dev/null 2>&1 &

	# open server in browser
	info "Opening the development server in the browser..."
	xdg-open http://localhost:3000 >/dev/null 2>&1 &

	info "The development environment is waiting for you, engineer"
}

start_services

compile_smart_contract() {
	info "Compiling the smart contracts..."
	info "$(npx hardhat compile)"
}

# replace the address of the smart contract with the deployed address in the app root
do_final() {
	sed -i "s/contractAddress = .*$/contractAddress = '$smart_contract_address'/" ./pages/_app.js
}

compile_smart_contract

network="localhost"
case "$1" in
	"mainnet")
		network="mainnet" ;;
	"rinkeby")
		network="rinkeby" ;;
	"ropsten")
		network="ropsten" ;;
	"kovan")
		network="kovan" ;;
esac

smart_contract_address=""

# deploy the smart contracts to the specified network
deploy() {
	info "Deploying the smart contracts to ${network} network..."
	smart_contract_address=$(npx hardhat run ./scripts/deploy.js --network "$network" 2>/dev/null)
}

if [[ "$network" != "localhost" ]]; then
	if (( $2 == 1 )); then
		deploy
		info "A new smart contract address: ${smart_contract_address} is cached"
		sed -i "s/SMART_CONTRACT_ADDRESS_ROPSTEN.*$/SMART_CONTRACT_ADDRESS_ROPSTEN=$smart_contract_address/" ./.env
	else
		info "Retrieving the cached smart contract address: ${smart_contract_address}..."
		smart_contract_address=$(grep "SMART_CONTRACT_ADDRESS_ROPSTEN" ./.env | cut -d "=" -f 2)
	fi
	do_final
else
	deploy
	while [[ $smart_contract_address == "" ]]; do
		error "Unable to deploy the smart contracts to $network network"
		warn "Please check your node is up and running and try again"
		info "Retrying in 5 seconds..."
		sleep 5s
		deploy
	done
	info "The smart contracts: ${BBLUE}${smart_contract_address}${CYAN} deployed successfully to ${network} network"
	do_final
fi
