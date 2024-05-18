const express = require('express')
const router = express.Router()
const rideController = require('../controllers/rideControllers')

router.get('/', rideController.getAll)
router.get('/:id', rideController.getOne)
router.get('/passenger/:passenger_id', rideController.getAllByUser)
router.get('/passenger/:passenger_id/:id', rideController.getOneByUser)

router.post('/', rideController.create)

router.patch('/:id/cancel', rideController.cancel)
router.patch('/:id/start', rideController.cancel)
router.patch('/:id/finish', rideController.finish)

module.exports = router
