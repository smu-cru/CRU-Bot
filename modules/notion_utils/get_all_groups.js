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
const GetAllGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    const groups = new Map;
    const response = yield notion.databases.query({
        database_id: '5ded4c5f554045c0865fb3d466ed43d2'
    });
    const results = response["results"];
    let items = yield Promise.all(results.map((group) => __awaiter(void 0, void 0, void 0, function* () {
        // get property IDs
        const pageID = group["id"];
        const idProperty = group["properties"]["ID"]["id"];
        const nameProperty = group["properties"]["Name"]["id"];
        const scheduleProperty = group["properties"]["Schedule"]["id"];
        const runningProperty = group["properties"]["Running"]["id"];
        // get properties
        const idResponse = yield notion.pages.properties.retrieve({ page_id: pageID, property_id: idProperty });
        const nameResponse = yield notion.pages.properties.retrieve({ page_id: pageID, property_id: nameProperty });
        const scheduleResponse = yield notion.pages.properties.retrieve({ page_id: pageID, property_id: scheduleProperty });
        const runningResponse = yield notion.pages.properties.retrieve({ page_id: pageID, property_id: runningProperty });
        // extract property values
        const groupID = idResponse["number"];
        const name = nameResponse["results"][0]["title"]["plain_text"];
        const schedule = scheduleResponse["results"][0]["rich_text"]["plain_text"];
        const running = runningResponse["checkbox"];
        //set as an object and return
        const result = {
            id: groupID,
            name: name,
            schedule: schedule,
            running: running
        };
        return result;
    })));
    return items;
});
exports.default = GetAllGroups;
