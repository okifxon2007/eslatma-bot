const { Telegraf } = require('telegraf');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');
const { setInterval } = require('timers');

const bot = new Telegraf('7656292869:AAE7bonRy47PLd-YyNGLqDNFHKdKAEMKMUs');

const firebaseConfig = {
    apiKey: "AIzaSyBqjQ2SosKX_OFRRiybn0y5AXOc02Bq2Gg",
    authDomain: "xabar-bot-abba1.firebaseapp.com",
    databaseURL: "https://xabar-bot-abba1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "xabar-bot-abba1",
    storageBucket: "xabar-bot-abba1.firebasestorage.app",
    messagingSenderId: "183488885435",
    appId: "1:183488885435:web:c1d5e922ca9a7c4bc2af9e",
    measurementId: "G-17Y303378H"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const getData = () => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const messagesArray = Object.values(data).map(message => message.text);
            const randomMessage = messagesArray[Math.floor(Math.random() * messagesArray.length)];
            bot.telegram.sendMessage('@botnitekshiruviuchun', randomMessage);
        }
    });
};

setInterval(getData, 3600 * 1000);


bot.start((ctx) => ctx.reply('Salom! Men sizning Telegram botingizman.'));
bot.help((ctx) => ctx.reply('Savollaringiz bo\'lsa, shunchaki yozing!'));

bot.on('text', (ctx) => {
    ctx.reply(`Siz yuborgan xabar: ${ctx.message.text}`);
});

bot.launch();

console.log('bot ishga tushdi.');
