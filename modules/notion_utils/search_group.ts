const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

dotenv.config();
const database_id = process.env.GROUP_DATABASE_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY as string });

const SearchGroup = async (chatId: number) => {
    const response = await notion.databases.query({
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
};

export default SearchGroup;