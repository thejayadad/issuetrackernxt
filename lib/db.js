import mongoose from "mongoose"

const connectDB = async () => {
    try {
        if(mongoose.connections[0].readystate){
            return true
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB Connected")
        return true
    } catch (error) {
        console.log("MONGODB ERROR " + error)        
    }
}

export default connectDB;