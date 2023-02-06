import { Context } from "telegraf";

const getTimeHandler = async (ctx: Context) => {
    const now = new Date;
    const hours = now.getHours()
    const minutes = now.getMinutes()
    ctx.reply(`The time now is ${hours}:${minutes}.`)
}

export default getTimeHandler;