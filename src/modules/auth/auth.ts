// const localStrategy = require('passport-local').Strategy;
import UserModel from "../sequelize/user"
import passport from "passport";
import Strategy from "passport-local"
const localStrategy = Strategy.Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

import * as bcrypt from 'bcrypt';

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, done: any) => {
            try {
                const user = await UserModel.create({ email: email, password: password });
                return done(null, user);
            } catch (error) {
                console.log(error)
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email: string, password: string, done: any) => {
            try {
                const user = await UserModel.findOne({ where: { email: email } });
                console.log(user)

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                // const validate = user.get("password") == await bcrypt.hash(password, 10)
                // console.log("Validate: ", await bcrypt.hash(password, 10))
                const validate = await bcrypt.compare(password, user.get("password") as string);

                // const validate = await UserModel.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                console.log(error)
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.TOKEN_SECRET as string,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token: any, done: any) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);