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
const search_group_1 = __importDefault(require("./search_group"));
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const UpdateSchedule = (chatID, schedule) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield (0, search_group_1.default)(chatID);
    if (group.results.length == 1) {
        console.log(group.results[0]);
        const pageId = group.results[0]["id"];
        const response = yield notion.pages.update({
            page_id: pageId,
            properties: {
                'Schedule': {
                    "rich_text": [{
                            "text": {
                                "content": schedule
                            }
                        }],
                },
            },
        });
        console.log(response);
    }
});
exports.default = UpdateSchedule;
