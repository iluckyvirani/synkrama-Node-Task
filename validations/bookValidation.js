import Joi from 'joi';

export const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().min(3).max(100).required(),
    published_year: Joi.number().min(1800).max(new Date().getFullYear()).required(),
});
