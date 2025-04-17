const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goals.controller');

// POST route to create a new goal
router.post('/create-goal', goalController.createGoal);

// Optional: GET route to retrieve goals for a specific user
router.get('/get-goal/:authId', goalController.getGoalsByUser);

router.delete('/delete-goal/:goalId', goalController.deleteGoal);

router.put('/update-goal/:goalId', goalController.updateGoal);

module.exports = router;
