const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');

// POST route to create a new activity
router.post('/create-activity', activityController.createActivity);

// Optional: GET route to retrieve activities for a specific user
router.get('/get-activity/:userId', activityController.getActivitiesByUser);
router.get('/get-activity-chart/:authId', activityController.getActivityChart);

module.exports = router;
