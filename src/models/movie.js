import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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
}, { versionKey: false });

schema.plugin(mongoosePaginate);

export default mongoose.model('Movie', schema);
