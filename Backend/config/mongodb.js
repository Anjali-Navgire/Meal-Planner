import mongoose from "mongoose";

const connectDB = async() => {

    mongoose.connection.on(`connected`, () =>
         console.log("Database connection successfull"));

    await mongoose.connect(`${process.env.MONGODB_URI}/Authentication`);
};

export default connectDB;