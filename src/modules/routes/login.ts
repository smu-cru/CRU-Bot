import passport from "passport";
import express from "express";
import jwt from "jsonwebtoken"
import UserModel from "../sequelize/user"

const router = express.Router();

router.post(
    '/signup',
    // passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        const password = req.body.password as string;
        const email = req.body.email as string;
        const name = req.body.email as string;
        const user = await UserModel.create({ email, password, name });
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
                        console.log(info)
                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { uuid: user.uuid, email: user.email };
                            const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET as string);

                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    console.log(error)
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;