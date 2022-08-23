import express from "express";
import bodyParser from "body-parser";
import { IncomingMail } from "cloudmailin";
import fs from "fs";
import stats from "request-stats";

const app = express();

app.use(bodyParser.json());

app.post("/incoming_mails/", (req, res) => {
    const mail = <IncomingMail>req.body;
    // stats(app, function (details:any) {
    //     var size = details.req.bytes;
    // })
    const sender = mail.headers.from;
    const size = req.socket.bytesRead;
    console.log("Size of email: " + size)
    console.log("Email headers: " + mail.headers)

    res.status(201).json(mail);
});


var server = app.listen(80, () => {
    if (server) {
        console.log(`server started on port 80`);
        console.log(server.address())
    }
});
