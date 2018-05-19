import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    index: { unique: true }
  },
  data: {
    required: false,
    type: Object
  }
});

export default mongoose.model('Movie', schema);
