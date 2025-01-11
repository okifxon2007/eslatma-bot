const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('7656292869:AAE7bonRy47PLd-YyNGLqDNFHKdKAEMKMUs'); 

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/data');
    const data = response.data;
    if (data) {
      const messagesArray = data.map(message => message.text); 
      const randomMessage = messagesArray[Math.floor(Math.random() * messagesArray.length)];
      bot.telegram.sendMessage('@botnitekshiruviuchun', randomMessage); 
    }
  } catch (error) {
    console.error('Xato:', error);
  }
};

setInterval(getData, 3600 * 1000); 

bot.start((ctx) => ctx.reply('Salom! Men sizning Telegram botingizman.'));
bot.help((ctx) => ctx.reply('Savollaringiz bo\'lsa, shunchaki yozing!'));

bot.on('text', (ctx) => {
  ctx.reply(`Siz yuborgan xabar: ${ctx.message.text}`);
});

bot.launch();

console.log('Bot ishga tushdi.');
