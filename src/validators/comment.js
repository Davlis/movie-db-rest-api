import Joi from 'joi';

export default {
  create: {
    body: {
      content: Joi.string().required(),
      movieId: Joi.string().required()
    }
  },
  list: {
    query: {
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(20),
    }
  },
  one: {
    params: {
      id: Joi.string().required(),
    }
  }
};
