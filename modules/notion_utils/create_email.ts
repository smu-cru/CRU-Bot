const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
dotenv.config();

const database_id = process.env.EMAIL_DATABASE_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY as string });

const CreateEmail = async (subject: string, size: number, sender: string) => {
    const response = await notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": database_id
        },
        "properties": {
            "Subject": {
                "title": [
                    {
                        "text": {
                            "content": subject
                        }
                    }
                ]
            },
            "Approx Size (KB)": {
                "number": size
            },
            "Sender": {
                "rich_text": [{
                    "text": {
                        "content": sender
                    }
                }]
            }
        }
    });
};

export default CreateEmail;