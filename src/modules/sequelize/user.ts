import { DataTypes } from 'sequelize-cockroachdb';
import * as bcrypt from 'bcrypt';
import sequelize from "../sequelize/index"
// const sequelize = new Sequelize(process.env.PROD_DATABASE_URL as string);

const User = sequelize.define('users', {
    email: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        async set(value: string) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('password', await bcrypt.hash(value, 10));
        }
    },
    name: DataTypes.STRING,
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    timestamps: false
}
);

// User.validatePassword = function(inputPassword:string) {}

export default User;