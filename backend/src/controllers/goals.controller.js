const Goal = require('../models/goals.model'); // Import the Goal model
const mongoose = require('mongoose');
const User = require("../models/user.model")

// Controller to create a new goal
exports.createGoal = async (req, res) => {
    try {
        const { userId, description, startDate, endDate } = req.body;

        // Input validation: Check for required fields
        if (!userId || !description || !endDate) {
            return res.status(400).json({ message: 'userId, description, and endDate are required fields' });
        }


        // Check if endDate is after or equal to startDate
        const start = startDate ? new Date(startDate) : new Date(); // Use default if no startDate is provided
        const end = new Date(endDate);
        if (start > end) {
            return res.status(400).json({ message: 'End date must be after the start date' });
        }

        // Create a new goal instance
        const goal = new Goal({
            userId,
            description,
            startDate: start, // Use the default or provided startDate
            endDate: end
        });

        // Save the goal in the database
        const savedGoal = await goal.save();

        // Respond with the saved goal
        res.status(201).json({
            message: 'Goal created successfully',
            goal: savedGoal
        });

    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message
        });
    }
};

// Fetch all goals for a specific user (optional)
exports.getGoalsByUser = async (req, res) => {
    try {
        const { authId} = req.params;

      

        // Find all goals for the specified user
        const goals = await Goal.find({ userId:authId });

        if (goals.length === 0) {
            return res.status(404).json({ message: 'No goals found for this user' });
        }

        res.status(200).json({
            message: 'Goals retrieved successfully',
            goals
        });
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message
        });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const {goalId} = req.params
        const goal = await Goal.findByIdAndDelete(goalId)
        res.json(goal)
    } catch (error) {
        console.log(error)
    }
}

exports.updateGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const goal = await Goal.findById(goalId);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Toggle the isAchieved value
        const isAchievedBefore = goal.isAchieved;
        goal.isAchieved = !goal.isAchieved;

        // Save the updated goal
        await goal.save();

        // Fetch the user associated with the goal
        const user = await User.findOne({authId:goal.userId}); // Assuming goal has userId field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the goal was not achieved before but now is, increment the score
        if (!isAchievedBefore && goal.isAchieved) {
            user.score += 2;
        } else if (isAchievedBefore && !goal.isAchieved) {
            // Optionally, you can decrease the score if the goal is marked as not achieved
            user.score -= 2;
        }

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: 'Goal updated successfully', goal, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


