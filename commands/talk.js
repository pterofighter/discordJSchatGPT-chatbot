const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios");

require('dotenv').config()
const api = process.env.CHATGPT_TOKEN
module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('talk to the bot')
        .addStringOption(option => option.setName('message').setDescription('enter the message here').setRequired(true)),
	async execute(interaction) {
        try {
            const response = await axios({
                method: "post",
                url: "https://api.openai.com/v1/completions",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${api}`
                },
                data: {
                    "prompt": interaction.options.getString('message'),
                    "model": "text-davinci-003",
                    "max_tokens": 500,
                    "temperature": 0.5
                }
            });
            await console.log(response.data.choices[0].text);
            await interaction.deferReply(response.data.choices[0].text);
            // axios({
            //     method: "post",
            //     url: "https://api.openai.com/v1/completions",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${api}`
            //     },
            //     data: {
            //         "prompt": interaction.options.getString('message'),
            //         "model": "text-davinci-003",
            //         "max_tokens": 500,
            //         "temperature": 0.5
            //     }
            // }).then(response => {
            //     console.log(response.data.choices[0].text)
            //     //fix waiting issue
            //     interaction.reply(response.data.choices[0].text)
            // }).catch(error => {
            //     console.log("TIKES")
            //     console.log(error)
            // })
        }
        catch (error) {
            console.log(error)
        }
	},
};