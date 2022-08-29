import { resolve } from "path";

const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

dotenv.config();
const database_id = process.env.GROUP_DATABASE_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY as string });
export type groupInfo = {
    id: number,
    name: string,
    schedule: string
    running: boolean
    production: boolean
}

const GetAllGroups = async () => {
    const botType = process.env.BOT_MODE;
    const response = await notion.databases.query({
        database_id: database_id
    })
    const results: Array<any> = response["results"];
    let items = await Promise.all(results.map(async (group): Promise<groupInfo> => {
        // get property IDs
        const pageID = group["id"]
        const idProperty = group["properties"]["ID"]["id"]
        const nameProperty = group["properties"]["Name"]["id"]
        const scheduleProperty = group["properties"]["Schedule"]["id"]
        const runningProperty = group["properties"]["Running"]["id"]
        const productionProperty = group["properties"]["Production"]["id"]

        // get properties
        const idResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: idProperty });
        const nameResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: nameProperty });
        const scheduleResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: scheduleProperty });
        const runningResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: runningProperty });
        const productionResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: productionProperty });

        // extract property values
        const groupID: number = idResponse["number"]
        const name = nameResponse["results"][0]["title"]["plain_text"]
        const schedule: string = scheduleResponse["results"][0]["rich_text"]["plain_text"]
        const running: boolean = runningResponse["checkbox"]
        const production: boolean = productionResponse["checkbox"]

        //set as an object and return
        const result: groupInfo = {
            id: groupID,
            name: name,
            schedule: schedule,
            running: running,
            production: production
        }
        return result
    }))
    const filteredResults = items.filter((group) => {
        return group.production && botType == "prod" || !group.production && botType == "dev";
    })
    return filteredResults
};


export default GetAllGroups;