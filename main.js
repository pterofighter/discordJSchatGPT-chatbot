const Discord = require('discord.js');

const { token }  = require('./config.json');

const prefix = '!';
const bot = new Discord.Client();
bot.login(token);