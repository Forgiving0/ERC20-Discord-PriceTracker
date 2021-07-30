## Track Ethereum Token with liquidity in real time
Discord bot that updates its nickname to the price of ANY ERC20 token on ethereum/eth sidechain.

### Installation
Install required packages
`npm install discord.js`
`npm install node-fetch`

### Setup
Modify `config.json`.
- Replace "token" with the Discord bot token
- Replace "ERC20" with the token contract address
- Replace "chainID" with the ethereum-based blockchain ID, i.e. 137 is polygon network, 56 is bsc
- Replace "ERC20TokenName" with the token name
- Replace "ERC20TokenSymbol" with the token symbol/ticker
- Replace "CoingeckoID" with the token's corresponding coingecko api ID (optional)
- Replace "discordServerID" with the Discord server the bot is in
