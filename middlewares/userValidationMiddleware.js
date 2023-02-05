const Joi = require("joi");
const { ValidationError, ParameterError } = require("../helpers/errors");

const userSignUpSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(`${error}`));
  }
  next();
};

const userLoginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(`${error}`));
  }
  next();
};

const subscriptionSchema = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    next(new ParameterError(`Incorrect subs`));
  }
  next();
};

module.exports = {
  userSignUpSchema,
  userLoginSchema,
  subscriptionSchema,
};
