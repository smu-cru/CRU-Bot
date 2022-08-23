"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_poll_1 = __importDefault(require("./send_poll"));
const schedule_poll_1 = __importDefault(require("./schedule_poll"));
const register_group_1 = __importDefault(require("./register_group"));
const attachLunchPollCommands = (bot) => {
    const schedulePoll = new schedule_poll_1.default.SchedulePoll();
    schedulePoll.SetUpGroups(bot);
    bot.command('sendPoll', send_poll_1.default.sendPollHandler);
    // bot.command('schedulePoll', SchedulePoll.schedulePollHandler);
    bot.command('startScheduledPoll', schedulePoll.StartPollsHandler);
    bot.command('stopScheduledPoll', schedulePoll.StopPollsHandler);
    bot.command('editScheduledPoll', schedulePoll.EditPollScheduleHandler);
    bot.command('showStatus', schedulePoll.ShowStatus);
    bot.command('registerGroup', register_group_1.default.registerGroupHandler);
};
// module.exports = attachLunchPollCommands;
exports.default = { attachLunchPollCommands };
