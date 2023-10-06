require('dotenv').config()
const { Telegraf } = require('telegraf')
const { OpenAI } = require('openai')
const axios = require('axios');
const bot = new Telegraf(process.env.TELEBOT_APIKEY)
const openai = new OpenAI();

async function fetchData(userQuery){
        const options = {
                method: 'POST',
                url: 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions',
                headers: {
                  'content-type': 'application/json',
                  'X-RapidAPI-Key': process.env.OPENAI_API_KEY,
                  'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com'
                },
                data: {
                  model: 'gpt-3.5-turbo',
                  messages: [
                    {
                      role: 'user',
                      content: userQuery
                    }
                  ],
                  temperature: 0.8
                }
        };
        try {
                const response = await axios.request(options);
                return response;
        } catch (error) {
                console.error(error);
        }
        return "Something failed !";
}

bot.start((ctx) => ctx.reply('Welcome to t-GPT. Type "about" to see what i can do.'))

bot.hears('hi',(ctx) => ctx.reply('Hey there 👋'))

bot.hears('about',(ctx) => ctx.reply("Hey there 👋,I am a pocket chat-GPT, built by tinku.\nAsk me anything as i am here to help.😁"))

bot.hears('About',(ctx) => ctx.reply("Hey there 👋,I am a pocket chat-GPT, built by tinku.\n Ask me anything as i am here to help.😁"))

bot.on('text', async (ctx) => {
        const userQuery = ctx.message.text;
        let result = await fetchData(userQuery);
        bot.telegram.sendMessage(ctx.chat.id,result.data.choices[0].message.content);
});
bot.launch()