const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {onSaveError} = require("../helpers");

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      unique: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false});

contactSchema.post("save", onSaveError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas
};