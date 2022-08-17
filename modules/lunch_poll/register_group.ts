import { Context } from "telegraf";
import CreateGroup from "../notion_utils/create_group";
import SearchGroup from "../notion_utils/search_group";

const registerGroupHandler = async (ctx: Context) => {
    const chatId = ctx.chat!.id;
    const chatType = ctx.chat?.type;
    if (chatType != "group") {
        ctx.reply("Not a group")
    }
    else {
        const title = ctx.chat!.title;
        const response = await SearchGroup(chatId);
        if (response.results.length == 0) {
            CreateGroup(title, chatId);
            ctx.reply("Group registered!");
        }
        else {
            ctx.reply("Group already registered!");
        }
    }
}

export default { registerGroupHandler }