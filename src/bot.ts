import { Telegraf } from 'telegraf';
const dotenv = require('dotenv');
import AttachCommands from './modules/index';

dotenv.config();
let bot: Telegraf;
if (process.env.BOT_MODE == "dev") {
    bot = new Telegraf(process.env.DEV_BOT_TOKEN as string);
} else {
    bot = new Telegraf(process.env.PROD_BOT_TOKEN as string);
}
process.env.TZ = 'Singapore'

bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
}); bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});

AttachCommands(bot);

// bot.telegram.sendPoll()
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));