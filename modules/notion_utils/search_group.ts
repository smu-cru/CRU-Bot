const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY as string });

const SearchGroup = async (chatId: number) => {
    const response = await notion.databases.query({
        database_id: '5ded4c5f554045c0865fb3d466ed43d2',
        filter: {
            property: 'ID',
            number: {
                equals: chatId
            }
        }
    });
    console.log(response);
    return response;
};

export default SearchGroup;