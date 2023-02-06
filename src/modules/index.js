"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const attachLunchPollCommands = require('./lunch_poll/index');
const index_1 = __importDefault(require("./lunch_poll/index"));
const attachCommands = (bot) => {
    index_1.default.attachLunchPollCommands(bot);
};
exports.default = attachCommands;
