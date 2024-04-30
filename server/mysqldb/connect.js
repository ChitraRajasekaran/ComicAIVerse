import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('connected to mongo'))
    .catch((err) => {
      console.error('failed to connect with mongo');
      console.error(err);
    });
};

export default connectDB;

// import mysql from 'mysql2/promise.js';

// const connectDB = async (url) => {
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'rootroot',
//     database: 'comicAIVerse',
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.error('Failed to connect to MySQL:', err);
//     } else {
//       console.log('Connected to MySQL');
//     }
//   });

//   return connection;
// };

// export default connectDB;