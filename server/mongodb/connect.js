import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true)
    mongoose.connect(url).
    then(() => console.log("Mongo connected")).
    catch((e) => console.log(e));
}

export default connectDB;

