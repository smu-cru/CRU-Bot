import { Context, Telegraf } from "telegraf";
import GetAllGroups from "../notion_utils/get_all_groups";
import CreateGroup from "../notion_utils/create_group";
import SearchGroup from "../notion_utils/search_group";
import { groupInfo } from "../notion_utils/get_all_groups";
// var cron = require("node-cron");
import { schedule, ScheduledTask } from "node-cron";
import UpdateStatus from "../notion_utils/update_status";
import UpdateSchedule from "../notion_utils/update_schedule";
import { group } from "console";

class SchedulePoll {
    currentTasks: Map<number, ScheduledTask>;
    groups: groupInfo[] = [];
    pollOptions = {
        question: "Lunch Tomorrow?",
        options: ["Yes, I'm cool like that", "Yes, can help me buy pls", "No, but I FOMO"],
        extra: { is_anonymous: false }
    }

    constructor() {
        this.currentTasks = new Map<number, ScheduledTask>;
    }

    UpdateGroups = async () => {
        const groups = await GetAllGroups()
        this.groups = groups
    }

    SetUpGroups = async (bot: Telegraf) => {
        const groups = await GetAllGroups()
        this.groups = groups;
        this.groups.forEach(group => {
            if (group.running) {
                var task = schedule(group.schedule, async () => {
                    const chatId = group.id;
                    bot.telegram.sendPoll(
                        chatId,
                        this.pollOptions.question,
                        this.pollOptions.options,
                        this.pollOptions.extra
                    );
                });
                task.start();
                this.currentTasks.set(group.id, task);
            }
        });
    }

    ShowStatus = async (ctx: Context) => {
        this.groups.forEach(group => {
            if (ctx.chat?.id == group.id) {
                ctx.reply("Current status \nSchedule: " + group.schedule + "\nStatus: " + group.running);
            }
        });
    }

    registerGroupHandler = async (ctx: Context) => {
        const chatId = ctx.chat!.id;
        const chatType = ctx.chat?.type;
        if (chatType != "group") {
            ctx.reply("Not a group")
        }
        else {
            try {
                if (ctx.message) {
                    if ('text' in ctx.message) {
                        const message: string[] = ctx.message.text.split(" ");
                        delete message[0]
                        const scheduleString = message.join(" ")
                        console.log(scheduleString);
                        try {
                            var task = schedule(scheduleString, async () => {
                                console.log("Correct format")
                            });
                            task.stop();
                            const title = ctx.chat!.title;
                            const response = await SearchGroup(chatId);
                            if (response.results.length == 0) {
                                CreateGroup(title, chatId, scheduleString);
                                ctx.reply("Group registered!");
                            }
                            else {
                                ctx.reply("Group already registered!");
                            }
                        } catch (error) {
                            this.SendFormatErrorMessage(chatId, ctx)
                        }
                    }
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    EditPollScheduleHandler = async (ctx: Context) => {
        const chatId = ctx.chat!.id;
        const type = ctx.chat!.type;
        const group = this.groups.find(group => group.id == chatId)
        if (type == "private") {
            ctx.reply("Schedule must be set in the group!")
        }
        else {
            try {
                if (ctx.message) {
                    if ('text' in ctx.message) {
                        const message: string[] = ctx.message.text.split(" ");
                        delete message[0]
                        const scheduleString = message.join(" ")
                        console.log(scheduleString);
                        try {
                            var task = schedule(scheduleString, async () => {
                                console.log("Correct format");
                            });
                            task.stop();
                            if (group?.running) this.currentTasks.get(chatId)?.stop();
                            if (group) group.schedule = scheduleString;
                            UpdateSchedule(chatId, scheduleString)
                            ctx.reply("Schedule updated successfully!")
                            if (group?.running) {
                                var task = schedule(group.schedule, async () => {
                                    const chatId = group.id;
                                    ctx.telegram.sendPoll(
                                        chatId,
                                        this.pollOptions.question,
                                        this.pollOptions.options,
                                        this.pollOptions.extra
                                    );
                                });
                                task.start();
                                this.currentTasks.set(chatId, task)
                                ctx.reply("Task restarted!")
                            }
                            this.UpdateGroups();
                        } catch (error) {
                            // console.log(error);
                            // ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
                            this.SendFormatErrorMessage(chatId, ctx)
                        }
                    }
                }
            }
            catch (error) {
                // ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
                this.SendFormatErrorMessage(chatId, ctx)
            }
        }
    }

    SendFormatErrorMessage = (chatId: number, ctx: Context) => {
        ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
        const format = "*Format:*\n``` ┌────────────── second (optional)\n │ ┌──────────── minute\n │ │ ┌────────── hour\n │ │ │ ┌──────── day of month\n │ │ │ │ ┌────── month\n │ │ │ │ │ ┌──── day of week\n │ │ │ │ │ │\n │ │ │ │ │ │\n * * * * * * ```"
        ctx.telegram.sendMessage(chatId, format, { parse_mode: "MarkdownV2" })
    }

    StartPollsHandler = async (ctx: Context) => {
        const chatID = ctx.chat?.id;
        const group = this.groups.find(group => group.id == chatID)
        if (group?.running) {
            ctx.reply("Scheduled polls already running!")
        }
        else if (group && chatID) {
            var task = schedule(group.schedule, async () => {
                const chatId = group.id;
                ctx.telegram.sendPoll(
                    chatId,
                    this.pollOptions.question,
                    this.pollOptions.options,
                    this.pollOptions.extra
                );
            });
            task.start();
            this.currentTasks.set(chatID, task);
            UpdateStatus(chatID, true);
            ctx.reply("Scheduled polls started! ");
            this.UpdateGroups();

            // this.currentTask = task;
        }
    }

    StopPollsHandler = async (ctx: Context) => {
        const chatID = ctx.chat!.id;
        const group = this.groups.find(group => group.id == chatID)
        if (group && chatID) {
            if (!group.running) {
                ctx.reply("All scheduled polls are already stopped!");
            }
            else {
                const task = this.currentTasks.get(chatID);
                task?.stop();
                UpdateStatus(chatID, false);
                ctx.reply("Scheduled polls stopped!")
                this.UpdateGroups();
            }
        }
    }
}


// module.exports = sendPollHandler;
export default { SchedulePoll }

//  # ┌────────────── second(optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *