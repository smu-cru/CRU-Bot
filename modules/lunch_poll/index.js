"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_poll_1 = __importDefault(require("./send_poll"));
const schedule_poll_1 = __importDefault(require("./schedule_poll"));
const register_group_1 = __importDefault(require("./register_group"));
const attachLunchPollCommands = (bot) => {
    bot.command('sendPoll', send_poll_1.default.sendPollHandler);
    bot.command('schedulePoll', schedule_poll_1.default.schedulePollHandler);
    bot.command('registerGroup', register_group_1.default.registerGroupHandler);
};
// module.exports = attachLunchPollCommands;
exports.default = { attachLunchPollCommands };
