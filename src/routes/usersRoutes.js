const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.delete('/:id', userController.delete)
router.patch('/:id', userController.patch)

module.exports = router
