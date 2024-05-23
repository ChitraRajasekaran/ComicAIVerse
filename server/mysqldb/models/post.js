import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, },
  story: { type: String }, // Add this line
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;


// import mongoose from 'mongoose';

// const Post = new mongoose.Schema({
//   name: { type: String, required: true },
//   prompt: { type: String, required: true },
//   photo: { type: String, required: true },
// });

// const PostSchema = mongoose.model('Post', Post);

// export default PostSchema;
// import mongoose from 'mongoose';

// const Post = new mongoose.Schema({
//   name: { type: String },
//   story: { type: String },
//   prompt: { type: String},
//   photo: { type: String, required: true },
// });

// const PostSchema = mongoose.model('Post', Post);

// export default PostSchema;

// import { Sequelize, DataTypes } from 'sequelize';

// const sequelize = new Sequelize('mysql://root:rootroot@localhost:3306/comicAIVerse', {
//   dialect: 'mysql',
// });

// const Post = sequelize.define('post', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   prompt: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   photo: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// export default Post;