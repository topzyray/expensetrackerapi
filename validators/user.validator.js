import Joi from "joi";

const UserAddSchema = Joi.object({
  firstName: Joi.string().min(3).trim().required(),
  lastName: Joi.string().min(3).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

const UserLoginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
});

const UserUpdateSchema = Joi.object({
  firstName: Joi.string().min(3).trim(),
  lastName: Joi.string().min(3).trim(),
  email: Joi.string().email(),
  password: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ),
});

export const ValidateUserSignupMW = async (req, res, next) => {
  const userPayload = req.body;
  try {
    await UserAddSchema.validateAsync(userPayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};

export const ValidateUserSigninMW = async (req, res, next) => {
  const userPayload = req.body;
  try {
    await UserLoginSchema.validateAsync(userPayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};

export const ValidateUserUpdateMW = async (req, res, next) => {
  const userPayload = req.body;
  try {
    await UserUpdateSchema.validateAsync(userPayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};
