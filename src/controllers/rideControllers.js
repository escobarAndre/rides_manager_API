const Ride = require('../models/ride')
const User = require('../models/user')
const {
    getOneParamsSchema,
    getAllByUserSchema,
    getOneByUserSchema,
    createSchema,
    updateStatusSchema,
} = require('../utils/schema/rideSchema')

exports.getAll = async (_req, res) => {
    try {
        const rides = await Ride.findAll()
        res.status(200).json(rides)
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

        const rides = await Ride.findByPk(params.id)
        res.status(200).json(rides)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllByUser = async (req, res) => {
    try {
        const { params } = req
        const { error } = getAllByUserSchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const rides = await Ride.findAll({
            where: { passenger_id: req.params.passenger_id },
        })
        res.status(200).json(rides)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getOneByUser = async (req, res) => {
    try {
        const { params } = req
        const { error } = getOneByUserSchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const rides = await Ride.findAll({
            where: { passenger_id: req.params.passenger_id, id: req.params.id },
        })
        res.status(200).json(rides)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.create = async (req, res) => {
    try {
        const { body } = req
        const { error } = createSchema.validate(body)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const { passenger_id } = body

        const user = await User.findByPk(passenger_id)

        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const ride = await Ride.create({
            ...body,
            start_time: new Date(),
        })

        res.status(200).json(ride)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.cancel = async (req, res) => {
    try {
        const { params } = req
        const { error } = updateStatusSchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const ride = await Ride.findByPk(params.id)

        if (!ride) {
            res.status(404).json({ error: 'Ride not found' })
            return
        }

        if (ride.status !== 'pending') {
            res.status(400).json({ error: 'Can only cancel pending ride' })
            return
        }

        ride.status = 'cancelled'
        await ride.save()
        res.json(ride)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.start = async (req, res) => {
    try {
        const { params } = req
        const { error } = updateStatusSchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const ride = await Ride.findByPk(params.id)

        if (!ride) {
            res.status(404).json({ error: 'Ride not found' })
            return
        }

        if (ride.status !== 'pending') {
            res.status(400).json({ error: 'Can only start pending ride' })
            return
        }

        ride.status = 'running'
        await ride.save()
        res.json(ride)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.finish = async (req, res) => {
    try {
        const { params } = req
        const { error } = updateStatusSchema.validate(params)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const ride = await Ride.findByPk(params.id)

        if (!ride) {
            res.status(404).json({ error: 'Ride not found' })
            return
        }

        if (ride.status !== 'running') {
            res.status(400).json({ error: 'Ride is not running' })
            return
        }

        ride.status = 'completed'
        await ride.save()
        res.json(ride)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
