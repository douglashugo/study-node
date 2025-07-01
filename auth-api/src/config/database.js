import mongoose from "mongoose";

const dbConnect = mongoose.connect(process.env.MONGO_URI)

export default dbConnect;