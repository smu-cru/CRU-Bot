"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_all_groups_1 = __importDefault(require("../notion_utils/get_all_groups"));
const create_group_1 = __importDefault(require("../notion_utils/create_group"));
const search_group_1 = __importDefault(require("../notion_utils/search_group"));
// var cron = require("node-cron");
const node_cron_1 = require("node-cron");
const update_status_1 = __importDefault(require("../notion_utils/update_status"));
const update_schedule_1 = __importDefault(require("../notion_utils/update_schedule"));
class SchedulePoll {
    constructor() {
        this.groups = [];
        this.pollOptions = {
            question: "Lunch Tomorrow?",
            options: ["Yes, I'm cool like that", "Yes, can help me buy pls", "No, but I FOMO"],
            extra: { is_anonymous: false }
        };
        this.UpdateGroups = () => __awaiter(this, void 0, void 0, function* () {
            const groups = yield (0, get_all_groups_1.default)();
            this.groups = groups;
        });
        this.SetUpGroups = (bot) => __awaiter(this, void 0, void 0, function* () {
            const groups = yield (0, get_all_groups_1.default)();
            this.groups = groups;
            this.groups.forEach(group => {
                if (group.running) {
                    var task = (0, node_cron_1.schedule)(group.schedule, () => __awaiter(this, void 0, void 0, function* () {
                        const chatId = group.id;
                        bot.telegram.sendPoll(chatId, this.pollOptions.question, this.pollOptions.options, this.pollOptions.extra);
                    }));
                    task.start();
                    this.currentTasks.set(group.id, task);
                }
            });
        });
        this.ShowStatus = (ctx) => __awaiter(this, void 0, void 0, function* () {
            this.groups.forEach(group => {
                var _a;
                if (((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id) == group.id) {
                    ctx.reply("Current status \nSchedule: " + group.schedule + "\nStatus: " + group.running);
                }
            });
        });
        this.registerGroupHandler = (ctx) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const chatId = ctx.chat.id;
            const chatType = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.type;
            if (chatType != "group") {
                ctx.reply("Not a group");
            }
            else {
                try {
                    if (ctx.message) {
                        if ('text' in ctx.message) {
                            const message = ctx.message.text.split(" ");
                            delete message[0];
                            const scheduleString = message.join(" ");
                            console.log(scheduleString);
                            try {
                                var task = (0, node_cron_1.schedule)(scheduleString, () => __awaiter(this, void 0, void 0, function* () {
                                    console.log("Correct format");
                                }));
                                task.stop();
                                const title = ctx.chat.title;
                                const response = yield (0, search_group_1.default)(chatId);
                                if (response.results.length == 0) {
                                    (0, create_group_1.default)(title, chatId, scheduleString);
                                    ctx.reply("Group registered!");
                                }
                                else {
                                    ctx.reply("Group already registered!");
                                }
                            }
                            catch (error) {
                                this.SendFormatErrorMessage(chatId, ctx);
                            }
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
        this.EditPollScheduleHandler = (ctx) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const chatId = ctx.chat.id;
            const type = ctx.chat.type;
            const group = this.groups.find(group => group.id == chatId);
            if (type == "private") {
                ctx.reply("Schedule must be set in the group!");
            }
            else {
                try {
                    if (ctx.message) {
                        if ('text' in ctx.message) {
                            const message = ctx.message.text.split(" ");
                            delete message[0];
                            const scheduleString = message.join(" ");
                            console.log(scheduleString);
                            try {
                                var task = (0, node_cron_1.schedule)(scheduleString, () => __awaiter(this, void 0, void 0, function* () {
                                    console.log("Correct format");
                                }));
                                task.stop();
                                if (group === null || group === void 0 ? void 0 : group.running)
                                    (_b = this.currentTasks.get(chatId)) === null || _b === void 0 ? void 0 : _b.stop();
                                if (group)
                                    group.schedule = scheduleString;
                                (0, update_schedule_1.default)(chatId, scheduleString);
                                ctx.reply("Schedule updated successfully!");
                                if (group === null || group === void 0 ? void 0 : group.running) {
                                    var task = (0, node_cron_1.schedule)(group.schedule, () => __awaiter(this, void 0, void 0, function* () {
                                        const chatId = group.id;
                                        ctx.telegram.sendPoll(chatId, this.pollOptions.question, this.pollOptions.options, this.pollOptions.extra);
                                    }));
                                    task.start();
                                    this.currentTasks.set(chatId, task);
                                    ctx.reply("Task restarted!");
                                }
                                this.UpdateGroups();
                            }
                            catch (error) {
                                // console.log(error);
                                // ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
                                this.SendFormatErrorMessage(chatId, ctx);
                            }
                        }
                    }
                }
                catch (error) {
                    // ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
                    this.SendFormatErrorMessage(chatId, ctx);
                }
            }
        });
        this.SendFormatErrorMessage = (chatId, ctx) => {
            ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
            const format = "*Format:*\n``` ┌────────────── second (optional)\n │ ┌──────────── minute\n │ │ ┌────────── hour\n │ │ │ ┌──────── day of month\n │ │ │ │ ┌────── month\n │ │ │ │ │ ┌──── day of week\n │ │ │ │ │ │\n │ │ │ │ │ │\n * * * * * * ```";
            ctx.telegram.sendMessage(chatId, format, { parse_mode: "MarkdownV2" });
        };
        this.StartPollsHandler = (ctx) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const chatID = (_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id;
            const group = this.groups.find(group => group.id == chatID);
            if (group === null || group === void 0 ? void 0 : group.running) {
                ctx.reply("Scheduled polls already running!");
            }
            else if (group && chatID) {
                var task = (0, node_cron_1.schedule)(group.schedule, () => __awaiter(this, void 0, void 0, function* () {
                    const chatId = group.id;
                    ctx.telegram.sendPoll(chatId, this.pollOptions.question, this.pollOptions.options, this.pollOptions.extra);
                }));
                task.start();
                this.currentTasks.set(chatID, task);
                (0, update_status_1.default)(chatID, true);
                ctx.reply("Scheduled polls started! ");
                this.UpdateGroups();
                // this.currentTask = task;
            }
        });
        this.StopPollsHandler = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const chatID = ctx.chat.id;
            const group = this.groups.find(group => group.id == chatID);
            if (group && chatID) {
                if (!group.running) {
                    ctx.reply("All scheduled polls are already stopped!");
                }
                else {
                    const task = this.currentTasks.get(chatID);
                    task === null || task === void 0 ? void 0 : task.stop();
                    (0, update_status_1.default)(chatID, false);
                    ctx.reply("Scheduled polls stopped!");
                    this.UpdateGroups();
                }
            }
        });
        this.currentTasks = new Map;
    }
}
// module.exports = sendPollHandler;
exports.default = { SchedulePoll };
//  # ┌────────────── second(optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
