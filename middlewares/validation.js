// codes created by Alireza Minagar om July 9, 2025

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

/**
 * Helper for strict URL validation
 */
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error("string.uri");
};

/**
 * Validator for clothing item creation (POST /items)
 * Requires: name, imageUrl, weather
 */
const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "any.only": 'The "weather" field must be one of: hot, warm, cold',
      "string.empty": 'The "weather" field must be filled in',
    }),
  }),
});

/**
 * Validator for user signup (POST /signup)
 * Requires: name, avatar, email, password
 */
const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

/**
 * Validator for user login (POST /signin)
 * Requires: email, password
 */
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

/**
 * Validator for PATCH /users/me
 * Allows updating name and/or avatar, at least one must be present.
 */
const validateProfileUpdate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      avatar: Joi.string().custom(validateURL).messages({
        "string.uri": 'The "avatar" field must be a valid URL',
      }),
    })
    .min(1), // At least one field required
});

/**
 * Flexible validator for params with variable name
 * Use: validateId("userId"), validateId("itemId") etc.
 */
const validateId = (paramName = "id") =>
  celebrate({
    params: Joi.object().keys({
      [paramName]: Joi.string().hex().length(24).required().messages({
        "string.length": "ID must be 24 characters long",
        "string.hex": "ID must be a valid hexadecimal string",
        "string.empty": "ID must be provided",
      }),
    }),
  });

module.exports = {
  validateCardBody,
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validateId,
};
