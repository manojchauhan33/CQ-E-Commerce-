import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch(err => console.error(err));




  // mongoose.connect(process.env.MONGO_URI, (err) => {
  //     if (err) {
  //       console.error('err);
  //     } else {
  //       console.log('DB connected');
  //     }
  //   });





// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('DB connected');
//   } catch (err) {
//     console.error('Error connecting to DB:', err);
//   }
// };

// connectDB();
