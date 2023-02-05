const Joi = require("joi");
const mongoose = require("mongoose");
const { ValidationError, ParameterError } = require("../helpers/errors");

const contactValidationSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required(),
    email: Joi.string().email().required(),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(`${error}`));
  }
  next();
};

const favoriteFieldSchema = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    next(new ParameterError(`Missing field favorite`));
  }
  next();
};

const idValidation = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    next(new ParameterError(`Invalid ID`));
  }
  next();
};

module.exports = {
  contactValidationSchema,
  idValidation,
  favoriteFieldSchema,
};
