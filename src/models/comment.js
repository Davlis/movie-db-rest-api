import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  body: String,
});

export default mongoose.model('Comment', schema);
