const express = require("express")
const router = express.Router()

const {createWorkout, getWorkout, getWorkoutChart, getWorkoutDuration} = require("../controllers/workout.controller")

router.post('/create-workout', createWorkout)
router.get('/get-workout/:authId', getWorkout)
router.get('/get-workout-chart/:authId', getWorkoutChart)
router.get('/get-workout-calories/:authId', getWorkoutDuration)

module.exports  = router