import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const schema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  body: String,
}, { versionKey: false });

schema.plugin(mongoosePaginate);

export default mongoose.model('Comment', schema);
