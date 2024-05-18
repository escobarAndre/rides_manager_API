const Joi = require('joi')

exports.createUserBodySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).required(),
})

exports.getOneParamsSchema = Joi.object({
    id: Joi.number().integer().min(1),
})

exports.deleteParamsSchema = Joi.object({
    id: Joi.number().integer().min(1),
})
exports.patchBodySchema = Joi.object({
    id: Joi.number().integer().min(1),
    name: Joi.string(),
    email: Joi.string().email(),
    age: Joi.number().integer().min(18),
    total_rides: Joi.number().integer(),
    current_ride_id: Joi.number().integer(),
})
