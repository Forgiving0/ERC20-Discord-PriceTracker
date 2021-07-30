const config = require('./config.json')
const Discord = require('./discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')



client.on('ready', () => {
  console.log(`${client.user.tag} is online.`)
  updateNick()
  //updateChange()
  //updateChange() is optional if the ERC20 token is listed on a reliable crypto directory
})

async function updateNick() {
  while (true) {
    const res = await fetch(`https://api.1inch.exchange/v3.0/${config.chainID}/quote?fromTokenAddress=${config.ERC20}&toTokenAddress=${config.usdcoin}&amount=1000000000000000000`).then(result => result.json()).catch(console.log)
    //Use 1inch API to get a faster price directly from a DEX
    var priceraw=(res.toTokenAmount)
    if (!priceraw) {
      //if 1inch doesn't return anything, happens rarely.
      continue
    } else {
      if (priceraw.charAt(0)==='1') {
        var price = priceraw.substring(0,1)+'.'+priceraw.substring(1,5)
        console.log('$'+price)
        //Update Nickname in a specific server.
        client.guilds.cache.find(guild => guild.id === config.discordServerID).me.setNickname(`${config.ERC20TokenName}: $${price}`).catch(console.log)
      } else {
        var price = '0.'+priceraw.substring(0,5)
        console.log('$'+price)
        client.guilds.cache.find(guild => guild.id === config.discordServerID).me.setNickname(`${config.ERC20TokenName}: $${price}`).catch(console.log)
      }
    }
    await timer(15000) //ratelimit?
  }
}

async function updateChange() {
  while (true) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${config.CoingeckoID}`).then(res => res.json()).catch(console.log)
    if (!res[0].price_change_percentage_24h.toString().includes('-')) {
      const price = '+'+(res[0].price_change_percentage_24h).toFixed(2).toString()+'%'
      client.user.setActivity(`${config.ERC20TokenSymbol}: ${price}`, {type:"WATCHING"})

    } else {
      const price = (res[0].price_change_percentage_24h).toFixed(2).toString()+'%'
      client.user.setActivity(`${config.ERC20TokenSymbol}: ${price}`, {type:"WATCHING"})
    }
    await timer(15000)
  }
}

function timer(ms) {
    return new Promise(r => setTimeout(r, ms))
}

client.login(config.token)
