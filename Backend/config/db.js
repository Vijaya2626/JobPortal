import mongoose from 'mongoose';
import colors from 'colors'
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connect to Mongo Database ${mongoose.connection.host}`.bgYellow.white);
  } catch (error) {
    console.log(`MongoDB Error ${error}`.bgBlue.white);
  }

};
export default connectDB;