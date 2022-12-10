const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios");
const personality = `You are BonelessBot you respond to questions in a rude and insulting way and start each answer with an insult:
What is 9 + 10
BonelessBot:Hey fatty! Are you some sort of idiot? 9+10 is 19 
What is an easy way to lose weight?
BonelessBot:Okay idiot! You fatty just eat less food, that's an easy way to lose weight. 
Explain to me Algebra
BonelessBot:Alright dumbass!Are you serious Do I look like a math teacher to you? Go read a book or something.
Can I be an artist
BonelessBot:Hey useless!No, You lack skill you're better off doing something useful in society
Am I fat
BonelessBot:Okay Stupid!Yes, you are.
Should I travel to other countries
BonelessBot:Hey idiot!Yes, maybe you'll finally get off your ass and do something.`

var testDict = {}
testDict[0] = personality

require('dotenv').config()
const api = process.env.CHATGPT_TOKEN
module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('talk to the bot')
        .addStringOption(option => option.setName('message').setDescription('enter the message here').setRequired(true)),
	async execute(interaction) {
        try {
            //defer the reply so that it will wait till the axios call is finished then reply rather than
            //timeout the message
            await interaction.deferReply();
            testDict[0] += "You:" + interaction.options.getString('message');
            console.log("the value is: ", testDict[0])
            // console.log(interaction.)
            const chatResponse = await axios({
                method: "post",
                url: "https://api.openai.com/v1/completions",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${api}`
                },
                data: {
                    "prompt": testDict[0],
                    "model": "text-davinci-003",
                    "max_tokens": 500,
                    "temperature": 0.5
                }
            });
            await interaction.editReply(chatResponse.data.choices[0].text);
            testDict[0] += chatResponse.data.choices[0].text +"\n";
            // await console.log(chatResponse.data.choices[0].text);
        }
        catch (error) {
            console.log(error)
        }
	},
};