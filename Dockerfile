FROM node:lts-alpine3.14 AS build

WORKDIR /decentralized-vault

COPY package.json .

RUN npm install

COPY . .

RUN npx hardhat compile

RUN sed -i "s/^const greeterAddress = .*$/const greeterAddress = \
	'$(npx hardhat run scripts/deploy.js --network localhost \
	| sed 's/^.*: //g')'/" pages/index.js

RUN npm run build

CMD ["npm", "run", "dev"]
