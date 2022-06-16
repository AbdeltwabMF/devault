#!/usr/bin/bash
#
# Deploy the smart contract to given blockchain network
# @param $1 is the network you want to deploy to
# @param $2 redeploy flag which is 1 or 0
# @author Abd El-Twab M. Fakhry <abdeltwab.m.fakhry <at> gmail <dot> com>
# @date Jun. 2022

# ANCI terminal colors code
BLACK='\033[0;30m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
NC='\033[0m' # No Color

# ANCI terminal colors code (bold)
BRED='\033[1;31m'
BGREEN='\033[1;32m'
BYELLOW='\033[1;33m'
BBLUE='\033[1;34m'
BPURPLE='\033[1;35m'
BCYAN='\033[1;36m'
BWHITE='\033[1;37m'

# install long term support node.js to match the version supported by hardhat.
# this require you to install nvm first
# and put it under the following path: $HOME/.config/nvm/
if [[ -f "$HOME"/.config/nvm/nvm.sh ]]; then
	source "$HOME"/.config/nvm/nvm.sh
	printf "%b" "${BCYAN}[INFO]${CYAN} nvm is installed and loaded.\n${NC}"
	nvm install --lts
	printf "%b" "\n${NC}"
else
	printf "%b" "${BYELLOW}[WARN]${YELLOW} nvm is not installed.\n"
	printf "%b" "${BYELLOW}[WARN]${YELLOW} It's recommended to install nvm first, so it can install supported version of npm.\n${NC}"
fi

# compile the smart contracts
printf "%b" "${BCYAN}[INFO]${CYAN} Compiling smart contracts...${NC}\n"
npx hardhat compile
printf "%b" "\n${NC}"

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

deploy() {
	# deploy the smart contracts to the specified network
	printf "%b" "${BCYAN}[INFO]${CYAN} Deploying smart contracts to ${network} network...${NC}\n"
	smart_contract_address=$(npx hardhat run ./scripts/deploy.js --network "$network" 2>/dev/null)
}

if [[ "$network" != "localhost" ]]; then
	if (( $2 == 1 )); then
		deploy
		printf "%b" "${BCYAN}[INFO]${CYAN} New smart contract address: ${smart_contract_address} cached.\n${NC}"
		sed -i "s/SMART_CONTRACT_ADDRESS_ROPSTEN.*$/SMART_CONTRACT_ADDRESS_ROPSTEN=$smart_contract_address/" ./.env
	else
		printf "%b" "${BCYAN}[INFO]${CYAN} Retrieving smart contract cached address...${NC}\n"
		smart_contract_address=$(grep "SMART_CONTRACT_ADDRESS_ROPSTEN" ./.env | cut -d "=" -f 2)
	fi
else
	deploy
	while [[ $smart_contract_address == "" ]]; do
		printf "%b" "\n${BRED}[ERROR]${RED} Failed to deploy smart contract to $network network.${NC}\n"
		printf "%b" "${BYELLOW}[WARN]${YELLOW} Please check your node is up and running and try again.\n${NC}"
		printf "%b" "${BCYAN}[INFO]${CYAN} Retrying in 5 seconds...\n${NC}"
		sleep 5s
		smart_contract_address=$(npx hardhat run ./scripts/deploy.js --network "$network" 2>/dev/null)
	done
fi

# replace the address of the smart contract with the deployed address in the app root
sed -i "s/contractAddress = .*$/contractAddress = '$smart_contract_address'/" ./pages/_app.js

printf "%b" "\n${BGREEN}[INFO]${GREEN} Smart contract deployed to $network network.\n${NC}"
