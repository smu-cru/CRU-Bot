const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY as string });

const CreatePage = async (name: string, chatId: number, schedule: string) => {
    const response = await notion.pages.create({
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
            },
            "Schedule": {
                "rich_text": [{
                    "text": {
                        "content": schedule
                    }
                }]
            }
        }
    });
};

export default CreatePage;