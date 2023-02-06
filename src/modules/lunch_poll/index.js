"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_poll_1 = __importDefault(require("./send_poll"));
const schedule_poll_1 = __importDefault(require("./schedule_poll"));
const get_time_1 = __importDefault(require("./get_time"));
const attachLunchPollCommands = (bot) => {
    const schedulePoll = new schedule_poll_1.default.SchedulePoll();
    schedulePoll.SetUpGroups(bot);
    bot.command('send_poll', send_poll_1.default.sendPollHandler);
    // bot.command('schedulePoll', SchedulePoll.schedulePollHandler);
    bot.command('start_scheduled_poll', schedulePoll.StartPollsHandler);
    bot.command('stop_scheduled_poll', schedulePoll.StopPollsHandler);
    bot.command('edit_scheduled_poll', schedulePoll.EditPollScheduleHandler);
    bot.command('show_status', schedulePoll.ShowStatus);
    bot.command('register_group', schedulePoll.registerGroupHandler);
    bot.command('get_time', get_time_1.default);
};
// module.exports = attachLunchPollCommands;
exports.default = { attachLunchPollCommands };
