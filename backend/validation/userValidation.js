    const Joi = require("joi");
    const validateUser = (user) =>{
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
    return schema.validate(user);
    }
    module.exports = { validateUser}
