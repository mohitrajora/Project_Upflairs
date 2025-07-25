import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {
    timestamps: true
});

const User = model("User", userSchema);
export { User };