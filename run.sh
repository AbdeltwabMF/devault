#!/usr/bin/bash

# Local blockchain
setsid "$TERMINAL" -e npx hardhat node &

# run the development server
setsid "$TERMINAL" -e npm run dev &

# open server in browser
xdg-open http://localhost:3000 &

sleep 5s
sh deploy.sh

# test the smart contract
npm test
