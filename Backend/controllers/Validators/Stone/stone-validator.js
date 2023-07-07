const Joi = require("joi");
const StoneValidator = Joi.object({
    companyName: Joi.string().required(),
    totalWeight: Joi.number().required()
})

module.exports = {
    StoneValidator
}