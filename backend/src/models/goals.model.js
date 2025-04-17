const mongoose = require('mongoose');

// Schema for user goals
const goalsSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    description: {
        type: String,
        required: true,
        minlength: 5, // Ensure the description is meaningful
        maxlength: 500, // Limit the description length
        trim: true // Remove excess spaces from the input
    },
    startDate: {
        type: Date,
        default: Date.now, // Default to current date
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // The end date must be after the start date
                return this.startDate <= value;
            },
            message: 'End date must be greater than or equal to start date'
        }
    },
    isAchieved:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalsSchema);
