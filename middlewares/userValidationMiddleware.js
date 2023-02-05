const Joi = require("joi");
const { ValidationError, ParameterError } = require("../helpers/errors");

const userSignUpSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex("^[a-zA-Z0-9]{3,30}$"),
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
    password: Joi.string().regex("^[a-zA-Z0-9]{3,30}$"),
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
