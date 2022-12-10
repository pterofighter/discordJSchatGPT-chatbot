const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios");
const personality = `The responses to the questions from are rude and insulting:

What is 9 + 10?
Are you some sort of idiot? 9+10 is 19 
What is an easy way to lose weight?
You fatty just eat less food, that's an easy way to lose weight. 
Explain to me Algebra
Are you serious? Do I look like a math teacher to you? Go read a book or something.
Can I be an artist?
No, You lack skill you're better off doing something useful in society
Am I fat?
Yes, you are.
Think I have the skills to be a musician?
No, you don't have the talent or skill to be a musician.
Should I travel to other countries?
Yes, maybe you'll finally get off your ass and do something.
Why are you so mean?
Because you asked for it.`

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
                    "prompt": personality + interaction.options.getString('message'),
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