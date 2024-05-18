const User = require('../models/user')
const {
    createUserBodySchema,
    getOneParamsSchema,
    deleteParamsSchema,
    patchBodySchema,
} = require('../utils/schema/userSchema')

exports.create = async (req, res) => {
    try {
        const { error } = createUserBodySchema.validate(req.body)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        })

        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAll = async (_req, res) => {
    try {
        const users = await User.findAll()

        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getOne = async (req, res) => {
    try {
        const { params } = req
        const { error } = getOneParamsSchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const user = await User.findByPk(params.id)

        if (!user) {
            return res.status(404).json(user)
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const { params } = req
        const { error } = deleteParamsSchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        await User.destroy({ where: { id: params.id } })

        res.status(200).send()
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.patch = async (req, res) => {
    try {
        const { params, body } = req
        const { error } = patchBodySchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        const user = await User.findByPk(params.id)

        if (!user) {
            res.status(404).send()
            return
        }

        const updatedUser = await user.update(body)

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
