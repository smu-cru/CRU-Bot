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
const node_cron_1 = require("node-cron");
const create_group_1 = __importDefault(require("../notion_utils/create_group"));
const search_group_1 = __importDefault(require("../notion_utils/search_group"));
const registerGroupHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
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
                        var task = (0, node_cron_1.schedule)(scheduleString, () => __awaiter(void 0, void 0, void 0, function* () {
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
                        console.log(error);
                        ctx.telegram.sendMessage(chatId, "Send valid cron format. See https://www.npmjs.com/package/node-cron for details.");
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.default = { registerGroupHandler };
