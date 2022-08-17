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
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const CreatePage = (name, chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": "5ded4c5f554045c0865fb3d466ed43d2"
        },
        "properties": {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": name
                        }
                    }
                ]
            },
            "ID": {
                "number": chatId
            }
        }
    });
    console.log(response);
});
exports.default = CreatePage;
