import { Context, Telegraf, Markup } from 'telegraf';

const dotenv = require('dotenv');
import AttachCommands from './modules/index';
// import { Update } from 'typegram'; const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
}); bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});

AttachCommands(bot);

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));