import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on("connected", () => console.log("Database Connected Successfully!"));