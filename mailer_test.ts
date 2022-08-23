import express from "express";
import bodyParser from "body-parser";
import { IncomingMail } from "cloudmailin";
import fs from "fs";

const app = express();

app.use(bodyParser.json());

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
    const mail = <IncomingMail>req.body;

    res.status(201).json(mail);
});


app.listen(80, "0.0.0.0", () => {
    console.log(`server started http://0.0.0.0:80`);
});
