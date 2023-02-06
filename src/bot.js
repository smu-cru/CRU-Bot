"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv = require('dotenv');
const index_1 = __importDefault(require("./modules/index"));
dotenv.config();
let bot;
if (process.env.BOT_MODE == "dev") {
    bot = new telegraf_1.Telegraf(process.env.DEV_BOT_TOKEN);
}
else {
    bot = new telegraf_1.Telegraf(process.env.PROD_BOT_TOKEN);
}
process.env.TZ = 'Singapore';
bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
});
bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});
(0, index_1.default)(bot);
// bot.telegram.sendPoll()
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
