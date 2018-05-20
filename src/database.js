import mongoose from 'mongoose';

import { Comment, Movie } from './models';

export default (config) => {
  const connect = mongoose.connect(config.mongo.url);

  const models = {
    Movie,
    Comment
  };

  return {
    mongoose,
    connection: mongoose.connection,
    connect,
    models
  };
};
