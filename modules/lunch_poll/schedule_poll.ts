import { Context } from "telegraf";
var cron = require("node-cron");

const schedulePollHandler = async (ctx: Context) => {
    var task = cron.schedule("10 * * * * *", async () => {
        const chatId = ctx.chat!.id;
        const question = "Lunch Today?"
        const options = ["Yes, I'm cool like that", "No, I like to feel FOMO"];
        const extra = {
            is_anonymous: false,
        }
        const result = await ctx.telegram.sendPoll(chatId, question, options, extra);
        console.log(result);
    });
    task.start();
    // ctx.reply("sendPoll is not implemented yet");
}

// module.exports = sendPollHandler;
export default { schedulePollHandler }

//  # ┌────────────── second(optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *