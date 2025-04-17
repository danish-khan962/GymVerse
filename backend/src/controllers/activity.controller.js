const Activity = require('../models/activity.model'); // Import the Activity model
const mongoose = require('mongoose');

// Create a new activity
exports.createActivity = async (req, res) => {
    try {
        const { userId, distance, steps, activityDate } = req.body;

        // Input validation: Check for required fields
        if (!userId || !distance) {
            return res.status(400).json({ message: 'userId and distance are required fields' });
        }



        // Create a new activity instance
        const activity = new Activity({
            userId,
            distance,
            steps: steps || 0, // Default to 0 steps if not provided
            date: activityDate || Date.now(), // Default to current date if not provided
        });

        // Save the activity in the database
        const savedActivity = await activity.save();

        // Respond with the saved activity
        res.status(201).json({
            message: 'Activity created successfully',
            activity: savedActivity
        });

    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message
        });
    }
}

// Fetch all activities for a specific user (optional)
exports.getActivitiesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Get the current date
        const currentDate = new Date();

        // Calculate the start of the current week (Monday)
        const startOfWeek = new Date(currentDate);
        const dayOfWeek = startOfWeek.getDay(); // Get the current day of the week (0 = Sunday, 6 = Saturday)
        const distanceToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Calculate distance to Monday
        startOfWeek.setDate(currentDate.getDate() - distanceToMonday); // Move to the start of the week (Monday)
        startOfWeek.setHours(0, 0, 0, 0); // Set time to the start of the day

        // Calculate the end of the current week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Move to the end of the week (Sunday)
        endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day

        // Query to fetch activities within the current week (Monday to Sunday)
        const query = {
            userId,
            date: {
                $gte: startOfWeek,
                $lte: endOfWeek
            }
        };

        // Find all activities for the specified user within the current week
        const activities = await Activity.find(query);

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found for this user in the current week' });
        }

        res.status(200).json({
            message: 'Activities retrieved successfully',
            activities
        });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message
        });
    }
};


exports.getActivityChart = async (req, res) => {
    try {
      const { authId } = req.params;
  
      // Get the start and end of the current week (Monday to Sunday) using plain JavaScript
      const today = new Date();
      const dayOfWeek = today.getDay(); // Get the current day of the week (0 for Sunday, 6 for Saturday)
  
      // Calculate the difference to get to Monday (ISO week starts on Monday)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Set to Monday
  
      // Calculate the end of the week (Sunday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday
  
      // Ensure both startOfWeek and endOfWeek are at midnight
      startOfWeek.setHours(0, 0, 0, 0);
      endOfWeek.setHours(23, 59, 59, 999);
  
      // Building match condition with weekly date range
      const matchConditions = {
        userId: authId,
        date: { $gte: startOfWeek, $lte: endOfWeek } // Filter by current week
      };
  
      // Aggregation pipeline to group by each day of the week
      const response = await Activity.aggregate([
        {
          $match: matchConditions
        },
        {
          $project: {
            // Extract the date part (ignoring time)
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            distance: 1
          }
        },
        {
          $group: {
            _id: "$date", // Group by date
            totalDistance: { $sum: "$distance" } // Sum distance for each day
          }
        },
        {
          $sort: { _id: 1 } // Sort by date ascending
        }
      ]);
  
      // If no data is found, return a 404 status
      if (response.length === 0) {
        return res.status(404).json({ message: 'No activity data found for this user' });
      }
  
      // Format response to include total distance and date
      const formattedResponse = response.map(item => ({
        date: item._id,
        totalDistance: item.totalDistance
      }));
  
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching activity chart:', error);
      res.status(500).json({
        message: 'Server error, please try again later',
        error: error.message
      });
    }
  };
  
