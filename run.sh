#!/usr/bin/bash

# Local blockchain
setsid "$TERMINAL" -e npx hardhat node &
sleep 6s

sh deploy.sh

# run the development server
setsid "$TERMINAL" -e npm run dev &

sleep 2s

# open server in browser
xdg-open http://localhost:3000 &

# test the smart contract
npm test
