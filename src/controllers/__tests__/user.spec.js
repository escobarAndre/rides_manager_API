const {
    create,
    getAll,
    getOne,
    delete: deleteUser,
    patch,
} = require('../../controllers/userControllers')
const User = require('../../models/user')

jest.mock('../../models/user', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
}))

describe('User Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('create', () => {
        test('should create a new user', async () => {
            const req = {
                body: { name: 'John', email: 'john@example.com', age: 25 },
            }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const newUser = {
                id: 1,
                name: 'John',
                email: 'john@example.com',
                age: 25,
            }
            User.create.mockResolvedValue(newUser)

            await create(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(newUser)
        })

        test('should handle create user error', async () => {
            const req = {
                body: { name: 'John', email: 'john@example.com', age: 25 },
            }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to create user'
            User.create.mockRejectedValue(new Error(errorMessage))

            await create(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('getAll', () => {
        test('should get all users', async () => {
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const users = [
                { id: 1, name: 'John', email: 'john@example.com', age: 25 },
            ]
            User.findAll.mockResolvedValue(users)

            await getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(users)
        })

        test('should handle get all users error', async () => {
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to get users'
            User.findAll.mockRejectedValue(new Error(errorMessage))

            await getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('getOne', () => {
        test('should get one user', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const user = {
                id: 1,
                name: 'John',
                email: 'john@example.com',
                age: 25,
            }
            User.findByPk.mockResolvedValue(user)

            await getOne(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(user)
        })

        test('should handle get one user not found', async () => {
            const req = { params: { id: 4 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            User.findByPk.mockResolvedValue(null)

            await getOne(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalled()
        })

        test('should handle get one user error', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to get user'
            User.findByPk.mockRejectedValue(new Error(errorMessage))

            await getOne(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('delete', () => {
        test('should delete a user', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }

            await deleteUser(req, res)

            expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } })
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalled()
        })

        test('should handle delete user error', async () => {
            const req = { params: { id: 1 } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const errorMessage = 'Failed to delete user'
            User.destroy.mockRejectedValue(new Error(errorMessage))

            await deleteUser(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })

    describe('patch', () => {
        test('should update a user', async () => {
            const req = {
                params: { id: 1 },
                body: { name: 'John Doe', email: 'john@example.com', age: 25 },
            }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
            const user = {
                id: 1,
                name: 'Old Name',
                email: 'old@example.com',
                age: 20,
                update: jest.fn().mockResolvedValue({
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    age: 25,
                }),
            }
            User.findByPk.mockResolvedValue(user)

            await patch(req, res)

            expect(User.findByPk).toHaveBeenCalledWith(req.params.id)
            expect(user.update).toHaveBeenCalledWith(req.body)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                age: 25,
            })
        })

        test('should handle user not found', async () => {
            const req = {
                params: { id: 1 },
                body: { name: 'John Doe', email: 'john@example.com', age: 25 },
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            }
            User.findByPk.mockResolvedValue(null)

            await patch(req, res)

            expect(User.findByPk).toHaveBeenCalledWith(req.params.id)
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.send).toHaveBeenCalled()
        })

        test('should handle update user error', async () => {
            const req = {
                params: { id: 1 },
                body: { name: 'John Doe', email: 'john@example.com', age: 25 },
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            }
            const errorMessage = 'Failed to update user'
            const user = {
                id: 1,
                name: 'Old Name',
                email: 'old@example.com',
                age: 20,
                update: jest.fn().mockRejectedValue(new Error(errorMessage)),
            }
            User.findByPk.mockResolvedValue(user)

            await patch(req, res)

            expect(User.findByPk).toHaveBeenCalledWith(req.params.id)
            expect(user.update).toHaveBeenCalledWith(req.body)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
        })
    })
})
