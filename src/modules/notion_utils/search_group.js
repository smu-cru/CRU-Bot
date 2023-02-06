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
const database_id = process.env.GROUP_DATABASE_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const SearchGroup = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield notion.databases.query({
        database_id: database_id,
        filter: {
            property: 'ID',
            number: {
                equals: chatId
            }
        }
    });
    // console.log(response);
    return response;
});
exports.default = SearchGroup;
