"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post("/incoming_mails/", (req, res) => {
    const mail = req.body;
    // stats(app, function (details:any) {
    //     var size = details.req.bytes;
    // })
    const sender = mail.headers.from;
    const size = req.socket.bytesRead;
    console.log("Size of email: " + size);
    console.log("Email headers: " + mail.headers);
    res.status(201).json(mail);
});
var server = app.listen(80, () => {
    if (server) {
        console.log(`server started on port 80`);
        console.log(server.address());
    }
});
