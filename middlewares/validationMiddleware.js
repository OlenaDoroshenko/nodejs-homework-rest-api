const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      email: Joi.string().email().required(),
      favorite: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError(`${error}`));
    }

    next();
  },
};
