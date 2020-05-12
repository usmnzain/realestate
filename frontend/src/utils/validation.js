const Joi = require("@hapi/joi");
const schema = Joi.object().keys({
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
  password1: Joi.string()
    .min(6)
    .max(30)
    .required(),
  password2: Joi.any()
    .equal(Joi.ref("password1"))
    .required()
});
export function registerValidate(fname, lname, email, password1, password2) {
  const result = schema.validate(
    {
      fname,
      lname,
      email,
      password1,
      password2
    },
    { abortEarly: false }
  );
  return result;
}

export function loginValidate(fname, lname, email, password1, password2) {
  const result = schema.validate(
    {
      email,
      password1
    },
    { abortEarly: false }
  );
  return result;
}
