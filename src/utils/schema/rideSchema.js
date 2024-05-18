const Joi = require('joi')

exports.getOneParamsSchema = Joi.object({
    id: Joi.number().integer().min(1),
})

exports.getAllByUserSchema = Joi.object({
    passenger_id: Joi.number().integer().min(1),
})

exports.getOneByUserSchema = Joi.object({
    passenger_id: Joi.number().integer().min(1),
    id: Joi.number().integer().min(1),
})

exports.createSchema = Joi.object({
    passenger_id: Joi.number().integer().min(1),
    start_location: Joi.string().required(),
    end_location: Joi.string().required(),
    payment_method: Joi.string().required().valid('credit_card', 'cash'),
})

exports.updateStatusSchema = Joi.object({
    id: Joi.number().integer().min(1),
})
