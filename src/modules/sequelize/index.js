"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { Sequelize } = require("sequelize-cockroachdb");
const sequelize_cockroachdb_1 = require("sequelize-cockroachdb");
const sequelize = new sequelize_cockroachdb_1.Sequelize(process.env.PROD_DATABASE_URL);
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
exports.default = sequelize;
