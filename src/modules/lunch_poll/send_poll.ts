import { Context } from "telegraf";

const sendPollHandler = async (ctx: Context) => {
    const chatId = ctx.chat!.id;
    const question = "Lunch Today?"
    const options = ["Yes, before 12pm", "Yes, after 12pm", "No, I like to feel FOMO"];
    const extra = {
        is_anonymous: false,
    }
    const result = await ctx.telegram.sendPoll(chatId, question, options, extra);
    console.log(result);
}

// module.exports = sendPollHandler;
export default { sendPollHandler }