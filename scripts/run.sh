#!/usr/bin/bash

# start local blockchain node
setsid "$TERMINAL" -e npx hardhat node &

# run the development server
setsid "$TERMINAL" -e npm run dev &

# open server in browser
xdg-open http://localhost:3000 &
