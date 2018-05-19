import mongoose from 'mongoose';

import { comment, movie } from './models';

export default (config) => {
  mongoose.connect(config.mongo.url);

  const models = {
    movie,
    comment
  };

  return {
    connection: mongoose.connection,
    models
  };
};
