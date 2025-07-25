import jwt from 'jsonwebtoken';
import 'dotenv/config'
export const jwtVerified = async (req, res, next) => {
    let token = req.headers.token;
    let jwtCheck = await jwt.verify(token, process.env.SECRET);
    console.log(jwtCheck);
    if (!jwtCheck) {
        return res.status(401).json({ data: null, message: "Invalid Token", status: false })
    }
    req.user = jwtCheck;
    next();
}

export const jwtGenerator = async (req, res) => {
    return jwt.sign(JSON.parse(req.userData), process.env.SECRET, { expiresIn: '1h' });
}