import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  data: {
    required: false,
    type: Object
  }
});

export default mongoose.model('Movie', schema);
