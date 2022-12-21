const {Schema, model} = require("mongoose");
const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const {onSaveError} = require('../helpers');

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: [
        "starter", 
        "pro", 
        "business"
      ],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  }, {versionKey: false});

userSchema.post("save", onSaveError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });

const arrayOfSubscription = ['starter', 'pro', 'business'];

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...arrayOfSubscription).required()
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    emailSchema
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}