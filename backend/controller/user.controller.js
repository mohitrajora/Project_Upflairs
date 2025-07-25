import { jwtGenerator } from "../middleware/jwt.middleware.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    try {
        let { username, firstName, lastName, email, password, mobile, role } = req.body;

        // Handle if username not directly provided
        if (!username) {
            if (!firstName || !lastName) {
                return res.status(400).json({
                    data: null,
                    message: "Please provide either username or both firstName and lastName.",
                    status: false,
                });
            }
            username = firstName + lastName;
        }

        // Hash password
        password = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            username,
            email,
            password,
            mobile,
            role, // include this only if needed
        });

        const userData = await newUser.save();

        res.status(200).json({
            data: userData,
            message: "User registered successfully",
            status: true,
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            message: err.message,
            status: false,
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check mail
        const userData = await User.findOne({ email });
        console.log(userData);

        if (!userData) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                status: false
            })
        }
        // password check
        const matchPassword = await bcrypt.compare(password, userData.password);
        console.log(matchPassword);
        if (!matchPassword) {
            res.status(400).json({ data: null, message: "Password is incorrect", status: false });
        }

        // token gen.
        req.userData = JSON.stringify(userData);
        let jwtToken = await jwtGenerator(req, res);

        res.status(200).json({
            data: { userData, jwtToken },
            message: "User login successfully!",
            status: true
        })
    }
    catch (err) {
        res.status(500).json({ data: null, message: err.message, status: false });
    }
};

const getAllUser = async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json({
            data: userData,
            message: "User data get successfully",
            status: true,
        });
    } catch (err) {
        res
            .status(500)
            .json({ data: null, message: err.message, status: false });
    }
};

const userDelete = async (req, res) => {
    try {
        const { id } = req.params; // ✅ Get ID from route params
        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({
                data: null,
                message: "User doesn't exist",
                status: false,
            });
        }

        const userDel = await User.deleteOne({ _id: id });

        res.status(200).json({
            data: userDel,
            message: "User deleted successfully",
            status: true,
        });
    } catch (err) {
        res.status(500).json({ data: null, message: err.message, status: false });
    }
};


export { register, userLogin, getAllUser, userDelete };