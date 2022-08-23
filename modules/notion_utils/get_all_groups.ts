import { resolve } from "path";

const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY as string });
export type groupInfo = {
    id: number,
    name: string,
    schedule: string
    running: boolean
}

const GetAllGroups = async () => {
    const groups = new Map<number, string>
    const response = await notion.databases.query({
        database_id: '5ded4c5f554045c0865fb3d466ed43d2'
    })
    const results: Array<any> = response["results"];
    let items = await Promise.all(results.map(async (group): Promise<groupInfo> => {
        // get property IDs
        const pageID = group["id"]
        const idProperty = group["properties"]["ID"]["id"]
        const nameProperty = group["properties"]["Name"]["id"]
        const scheduleProperty = group["properties"]["Schedule"]["id"]
        const runningProperty = group["properties"]["Running"]["id"]

        // get properties
        const idResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: idProperty });
        const nameResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: nameProperty });
        const scheduleResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: scheduleProperty });
        const runningResponse = await notion.pages.properties.retrieve({ page_id: pageID, property_id: runningProperty });

        // extract property values
        const groupID: number = idResponse["number"]
        const name = nameResponse["results"][0]["title"]["plain_text"]
        const schedule: string = scheduleResponse["results"][0]["rich_text"]["plain_text"]
        const running: boolean = runningResponse["checkbox"]

        //set as an object and return
        const result: groupInfo = {
            id: groupID,
            name: name,
            schedule: schedule,
            running: running
        }
        return result
    }))
    return items
};


export default GetAllGroups;