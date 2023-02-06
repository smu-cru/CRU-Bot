"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const create_email_1 = __importDefault(require("./modules/notion_utils/create_email"));
const passport_1 = __importDefault(require("passport"));
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
require('./modules/auth/auth');
dotenv.config();
const secret = process.env.TOKEN_SECRET;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const routes = require('./modules/routes/login');
const secureRoute = require('./modules/routes/dashboard');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/', routes);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport_1.default.authenticate('jwt', { session: false }), secureRoute);
// Handle errors.
// app.use(function (err:Error, req:Request, res:Response, next:NextFunction) {
//     res.status(err.status || 500);
//     res.json({ error: err });
// });
app.post("/incoming_mails/", (req, res) => {
    const mail = req.body;
    const byteReadSize = Math.round(req.socket.bytesRead / 1024);
    let subject = mail.headers.subject;
    if (!(typeof subject === "string")) {
        subject = subject.join();
    }
    let from = mail.headers.from;
    if (!(typeof from === "string")) {
        from = from.join();
    }
    console.log("Size of email: " + byteReadSize);
    console.log("Subject of email: " + mail.headers.subject);
    console.log("Email sender: " + mail.headers.from);
    (0, create_email_1.default)(subject, byteReadSize, from);
    res.status(201).json({ mail });
});
app.get('/', (req, res) => {
    res.send("Hello World!");
});
var server = app.listen(3000, "0.0.0.0", () => {
    if (server) {
        console.log(`server started on port 3000`);
        console.log(server.address());
    }
});
