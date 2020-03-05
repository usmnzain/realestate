const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    fname: Joi.string()
      .min(3)
      .max(20)
      .required(),
    lname: Joi.string()
      .min(2)
      .max(20)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] }
    }),
    cnic: Joi.number()
      .integer()
      .min(1000000000000)
      .max(9999999999999),
    password1: Joi.string()
      .min(6)
      .max(30)
      .required(),
    password2: Joi.any()
      .equal(Joi.ref("password1"))
      .required()
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .message("Email is invalid"),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
