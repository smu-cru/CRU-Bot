import { Context } from "telegraf";
import { schedule } from "node-cron";
import CreateGroup from "../notion_utils/create_group";
import SearchGroup from "../notion_utils/search_group";

const registerGroupHandler = async (ctx: Context) => {
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
                        console.log(error);
                        ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default { registerGroupHandler }