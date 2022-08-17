import { Telegraf } from "telegraf";
import SendPoll from "./send_poll";
import SchedulePoll from "./schedule_poll";
import RegisterGroup from "./register_group";

const attachLunchPollCommands = (bot: Telegraf) => {
    bot.command('sendPoll', SendPoll.sendPollHandler);
    bot.command('schedulePoll', SchedulePoll.schedulePollHandler);
    bot.command('registerGroup', RegisterGroup.registerGroupHandler);
}

// module.exports = attachLunchPollCommands;
export default { attachLunchPollCommands }