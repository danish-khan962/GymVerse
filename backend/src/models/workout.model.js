const mongoose = require('mongoose')


const workoutSchema = new mongoose.Schema({
  userId: {
    type: String,

  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  workoutType: {
    type: String, // Add more types as needed
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  caloriesBurned: {
    type: Number, // Optional, if you track calories burned
  },
}, { timestamps: true })

module.exports = mongoose.model("workout", workoutSchema)