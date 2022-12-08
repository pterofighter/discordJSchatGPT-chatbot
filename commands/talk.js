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
            //defer the reply so that it will wait till the axios call is finished then reply rather than
            //timeout the message
            await interaction.deferReply();
            const chatResponse = await axios({
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
            await interaction.editReply(chatResponse.data.choices[0].text);
        }
        catch (error) {
            console.log(error)
        }
	},
};