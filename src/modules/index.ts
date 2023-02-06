import { Telegraf } from "telegraf";
// const attachLunchPollCommands = require('./lunch_poll/index');
import LunchPollCommands from "./lunch_poll/index";

const attachCommands = (bot: Telegraf) => {
    LunchPollCommands.attachLunchPollCommands(bot);
}

export default attachCommands;