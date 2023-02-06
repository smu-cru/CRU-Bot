import { Telegraf } from "telegraf";
import SendPoll from "./send_poll";
import SchedulePoll from "./schedule_poll";
import getTimeHandler from "./get_time";

const attachLunchPollCommands = (bot: Telegraf) => {
    const schedulePoll = new SchedulePoll.SchedulePoll();
    schedulePoll.SetUpGroups(bot);
    bot.command('send_poll', SendPoll.sendPollHandler);
    // bot.command('schedulePoll', SchedulePoll.schedulePollHandler);
    bot.command('start_scheduled_poll', schedulePoll.StartPollsHandler);
    bot.command('stop_scheduled_poll', schedulePoll.StopPollsHandler);
    bot.command('edit_scheduled_poll', schedulePoll.EditPollScheduleHandler);
    bot.command('show_status', schedulePoll.ShowStatus);
    bot.command('register_group', schedulePoll.registerGroupHandler);
    bot.command('get_time', getTimeHandler);
}

// module.exports = attachLunchPollCommands;
export default { attachLunchPollCommands }