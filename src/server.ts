import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import { IncomingMail } from "cloudmailin";
import CreateEmail from "./modules/notion_utils/create_email";
import passport from "passport";
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
require('./modules/auth/auth');

dotenv.config();
const secret = process.env.TOKEN_SECRET;

const app = express();

app.use(bodyParser.json());

const routes = require('./modules/routes/login');
const secureRoute = require('./modules/routes/dashboard');


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
// app.use(function (err:Error, req:Request, res:Response, next:NextFunction) {
//     res.status(err.status || 500);
//     res.json({ error: err });
// });

app.post("/incoming_mails/", (req, res) => {
    const mail = <IncomingMail>req.body;
    const byteReadSize = Math.round(req.socket.bytesRead / 1024);

    let subject = mail.headers.subject;
    if (!(typeof subject === "string")) {
        subject = subject.join()
    }

    let from = mail.headers.from;
    if (!(typeof from === "string")) {
        from = from.join()
    }

    console.log("Size of email: " + byteReadSize)
    console.log("Subject of email: " + mail.headers.subject)
    console.log("Email sender: " + mail.headers.from)
    CreateEmail(subject, byteReadSize, from)
    res.status(201).json({ mail });
});

app.get('/', (req, res) => {
    res.send("Hello World!")
})

var server = app.listen(3000, "0.0.0.0", () => {
    if (server) {
        console.log(`server started on port 3000`);
        console.log(server.address())
    }
});
