"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const create_email_1 = __importDefault(require("./modules/notion_utils/create_email"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '50mb' }));
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
