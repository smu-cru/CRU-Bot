// const { Sequelize } = require("sequelize-cockroachdb");
import { Sequelize } from 'sequelize-cockroachdb';

const sequelize = new Sequelize(process.env.PROD_DATABASE_URL as string);


// (async () => {
//     try {
//         const [results, metadata] = await sequelize.query("SELECT NOW()");
//         console.log(results);
//     } catch (err) {
//         console.error("error executing query:", err);
//     } finally {
//         await sequelize.close();
//     }
// })();

export default sequelize