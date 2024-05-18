const {
    getAll,
    getOne,
    getAllByUser,
    getOneByUser,
    create,
    cancel,
    start,
    finish,
} = require('../src/controllers/rideControllers')
const Ride = require('../src/models/ride')
const User = require('../src/models/user')

jest.mock('../src/models/ride', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
}))

jest.mock('../src/models/user', () => ({
    findByPk: jest.fn(),
}))

describe('Ride Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getAll', () => {
        test('should get all rides', async () => {
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const rides = [{ id: 1, passenger_id: 1 }]
            Ride.findAll.mockResolvedValue(rides)

            await getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(rides)
        })

        test('should handle get all rides error', async () => {
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to get rides'
            Ride.findAll.mockRejectedValue(new Error(errorMessage))

            await getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('getOne', () => {
        test('should get one ride', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, passenger_id: 1 }
            Ride.findByPk.mockResolvedValue(ride)

            await getOne(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(ride)
        })

        test('should handle get one ride error', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to get ride'
            Ride.findByPk.mockRejectedValue(new Error(errorMessage))

            await getOne(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('getAllByUser', () => {
        test('should get all rides by user', async () => {
            const req = { params: { passenger_id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const rides = [{ id: 1, passenger_id: 1 }]
            Ride.findAll.mockResolvedValue(rides)

            await getAllByUser(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(rides)
        })

        test('should handle get all rides by user error', async () => {
            const req = { params: { passenger_id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to get rides'
            Ride.findAll.mockRejectedValue(new Error(errorMessage))

            await getAllByUser(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('getOneByUser', () => {
        test('should get one ride by user', async () => {
            const req = { params: { passenger_id: 1, id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, passenger_id: 1 }
            Ride.findAll.mockResolvedValue(ride)

            await getOneByUser(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(ride)
        })

        test('should handle get one ride by user error', async () => {
            const req = { params: { passenger_id: 1, id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to get ride'
            Ride.findAll.mockRejectedValue(new Error(errorMessage))

            await getOneByUser(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('create', () => {
        test('should create a new ride', async () => {
            const req = {
                body: {
                    passenger_id: 1,
                    start_location: 'A',
                    end_location: 'B',
                    payment_method: 'cash',
                },
            }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const user = { id: 1, name: 'John' }
            const newRide = {
                id: 1,
                passenger_id: 1,
                start_location: 'A',
                end_location: 'B',
                start_time: new Date(),
            }
            User.findByPk.mockResolvedValue(user)
            Ride.create.mockResolvedValue(newRide)

            await create(req, res)

            expect(User.findByPk).toHaveBeenCalledWith(1)
            expect(Ride.create).toHaveBeenCalledWith({
                ...req.body,
                start_time: expect.any(Date),
            })
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(newRide)
        })

        test('should handle create ride user not found', async () => {
            const req = {
                body: {
                    passenger_id: 1,
                    start_location: 'A',
                    end_location: 'B',
                    payment_method: 'cash',
                },
            }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            User.findByPk.mockResolvedValue(null)

            await create(req, res)

            expect(User.findByPk).toHaveBeenCalledWith(1)
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' })
        })

        test('should handle create ride error', async () => {
            const req = {
                body: {
                    passenger_id: 1,
                    start_location: 'A',
                    end_location: 'B',
                    payment_method: 'cash',
                },
            }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to create ride'
            User.findByPk.mockRejectedValue(new Error(errorMessage))

            await create(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('cancel', () => {
        test('should cancel a pending ride', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, status: 'pending', save: jest.fn() }
            Ride.findByPk.mockResolvedValue(ride)

            await cancel(req, res)

            expect(ride.status).toBe('cancelled')
            expect(ride.save).toHaveBeenCalled()
            expect(res.json).toHaveBeenCalledWith(ride)
        })

        test('should handle ride not found', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            Ride.findByPk.mockResolvedValue(null)

            await cancel(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ error: 'Ride not found' })
        })

        test('should handle non-pending ride cancellation', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, status: 'running', save: jest.fn() }
            Ride.findByPk.mockResolvedValue(ride)

            await cancel(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Can only cancel pending ride',
            })
        })

        test('should handle cancel ride error', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to cancel ride'
            Ride.findByPk.mockRejectedValue(new Error(errorMessage))

            await cancel(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('start', () => {
        test('should start a pending ride', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, status: 'pending', save: jest.fn() }
            Ride.findByPk.mockResolvedValue(ride)

            await start(req, res)

            expect(ride.status).toBe('running')
            expect(ride.save).toHaveBeenCalled()
            expect(res.json).toHaveBeenCalledWith(ride)
        })

        test('should handle ride not found', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            Ride.findByPk.mockResolvedValue(null)

            await start(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ error: 'Ride not found' })
        })

        test('should handle non-pending ride start', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, status: 'completed', save: jest.fn() }
            Ride.findByPk.mockResolvedValue(ride)

            await start(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Can only start pending ride',
            })
        })

        test('should handle start ride error', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to start ride'
            Ride.findByPk.mockRejectedValue(new Error(errorMessage))

            await start(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('finish', () => {
        test('should finish a running ride', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, status: 'running', save: jest.fn() }
            Ride.findByPk.mockResolvedValue(ride)

            await finish(req, res)

            expect(ride.status).toBe('completed')
            expect(ride.save).toHaveBeenCalled()
            expect(res.json).toHaveBeenCalledWith(ride)
        })

        test('should handle ride not found', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            Ride.findByPk.mockResolvedValue(null)

            await finish(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ error: 'Ride not found' })
        })

        test('should handle non-running ride finish', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const ride = { id: 1, status: 'pending', save: jest.fn() }
            Ride.findByPk.mockResolvedValue(ride)

            await finish(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Ride is not running',
            })
        })

        test('should handle finish ride error', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to finish ride'
            Ride.findByPk.mockRejectedValue(new Error(errorMessage))

            await finish(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })
})
