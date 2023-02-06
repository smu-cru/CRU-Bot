"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../sequelize/user"));
const router = express_1.default.Router();
router.post('/signup', 
// passport.authenticate('signup', { session: false }),
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.email;
    const user = yield user_1.default.create({ email, password, name });
    res.json({
        message: 'Signup successful',
        user: req.user
    });
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                console.log(info);
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { uuid: user.uuid, email: user.email };
                const token = jsonwebtoken_1.default.sign({ user: body }, process.env.TOKEN_SECRET);
                return res.json({ token });
            }));
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }))(req, res, next);
}));
module.exports = router;
