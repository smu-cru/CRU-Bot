"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// app.post("/incoming_mails/", (req, res) => {
//     const mail = <IncomingMail>req.body;
//     const body = mail.html || mail.plain;
//     console.log(body)
//     const attachment = mail.attachments[0];
//     if (attachment.content) {
//         const data: Buffer = Buffer.from(attachment.content, 'base64');
//         fs.writeFileSync(attachment.file_name, data);
//         return res.status(201).json({ status: `wrote ${attachment.file_name}` });
//     }
//     res.status(422).json({ status: "Content passed" });
// });
app.post("/incoming_mails/", (req, res) => {
    const mail = req.body;
    res.status(201).json(mail);
});
app.listen(80, "0.0.0.0", () => {
    console.log(`server started http://0.0.0.0:80`);
});
