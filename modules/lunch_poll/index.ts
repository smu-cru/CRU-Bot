import { Telegraf } from "telegraf";
import SendPoll from "./send_poll";
import SchedulePoll from "./schedule_poll";
import RegisterGroup from "./register_group";

const attachLunchPollCommands = (bot: Telegraf) => {
    const schedulePoll = new SchedulePoll.SchedulePoll();
    schedulePoll.SetUpGroups(bot);
    bot.command('sendPoll', SendPoll.sendPollHandler);
    // bot.command('schedulePoll', SchedulePoll.schedulePollHandler);
    bot.command('startScheduledPoll', schedulePoll.StartPollsHandler);
    bot.command('stopScheduledPoll', schedulePoll.StopPollsHandler);
    bot.command('editScheduledPoll', schedulePoll.EditPollScheduleHandler);
    bot.command('showStatus', schedulePoll.ShowStatus);
    bot.command('registerGroup', RegisterGroup.registerGroupHandler);
}

// module.exports = attachLunchPollCommands;
export default { attachLunchPollCommands }