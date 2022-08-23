import SearchGroup from "./search_group";
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY as string });


const UpdateStatus = async (chatID: number, status: boolean) => {
    const group = await SearchGroup(chatID)
    if (group.results.length == 1) {
        console.log(group.results[0])
        const pageId = group.results[0]["id"]
        const response = await notion.pages.update({
            page_id: pageId,
            properties: {
                'Running': {
                    checkbox: status,
                },
            },
        });
        console.log(response);
    }

};

export default UpdateStatus;