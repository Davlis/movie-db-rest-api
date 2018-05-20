import Joi from 'joi';

export default {
  create: {
    body: {
      title: Joi.string().required()
    }
  },
  list: {
    query: {
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(20),
      sort: Joi.string().optional(),
    }
  },
  one: {
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
    }
  }
};
