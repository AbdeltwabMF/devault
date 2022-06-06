#!/usr/bin/bash
#
# run the local blockchain hardhat node and start up the development environment
# @author: Abd El-Twab M. Fakhry

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

# start local blockchain node
printf "%b" "${BCYAN}[INFO]${CYAN} Starting local blockchain node...${NC}\n"
setsid "$TERMINAL" -e npx hardhat node &

# run the development server
printf "%b" "${BCYAN}[INFO]${CYAN} Starting development server...${NC}\n"
setsid "$TERMINAL" -e npm run dev &

# open server in browser
printf "%b" "${BCYAN}[INFO]${CYAN} Opening development server in browser...${NC}\n"
xdg-open http://localhost:3000 &

printf "%b" "${BCYAN}[INFO]${CYAN} The development environment is waiting for you, engineer.${NC}\n\n"
