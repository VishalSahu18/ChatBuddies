import mongoose  from "mongoose";

const connectToMongoDB = async () =>{
    try{
        console.log(process.env.MONGO_DB_URI);
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        // console.log(error);
        console.log("Error connecting to MongoDB ",error.message);
    }
}

export default connectToMongoDB;