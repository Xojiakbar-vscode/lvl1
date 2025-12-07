const Joi = require("joi");
const validateAdmin = (admin) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(admin);
}
module.exports = { validateAdmin }