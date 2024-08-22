import Joi from "joi";

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required().min(0),
    image: {
      public_id: Joi.string().allow("", null),
      url: Joi.string().allow("", null),
    },
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

const userSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
});

export { listingSchema, reviewSchema, userSchema };
