const Workout = require('../models/workout.model');


// POST /workouts - Create a new workout entry
const createWorkout = async (req, res) => {
  try {
    const { userId, workoutType, duration, caloriesBurned, workoutDate } = req.body;

   

    if (!workoutType || !duration) {
      return res.status(400).json({ error: 'Workout type and duration are required' });
    }

   

    // Ensure duration is a positive number
    if (duration <= 0) {
      return res.status(400).json({ error: 'Duration must be a positive number' });
    }

    // Create a new workout entry
    const newWorkout = new Workout({
      userId,
      workoutType,
      duration,
      date:workoutDate,
      caloriesBurned: caloriesBurned || 0, // Default to 0 if not provided
    });

    // Save the workout to the database
    const savedWorkout = await newWorkout.save();

    // Return success response
    res.status(201).json({
      message: 'Workout created successfully',
      workout: savedWorkout,
    });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getWorkout = async (req, res) => {
  try {
    const { authId } = req.params;

    // Calculate the start and end of the current week (Monday to Sunday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Adjust to Monday
    startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Adjust to Sunday
    endOfWeek.setHours(23, 59, 59, 999); // Set time to 23:59:59

    // Fetch workouts for the current week
    const response = await Workout.aggregate([
      {
        $match: {
          userId: authId,
          date: { $gte: startOfWeek, $lte: endOfWeek } // Filter by current week
        }
      }
    ]);

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getWorkoutChart = async (req, res) => {
  try {
    const { authId } = req.params;

    // Calculate the start and end of the current week (Monday to Sunday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Adjust to Monday
    startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

    // Calculate the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Adjust to Sunday
    endOfWeek.setHours(23, 59, 59, 999); // Set time to 23:59:59

    // Fetch workout data for the current week and group by workout type
    const response = await Workout.aggregate([
      {
        $match: {
          userId: authId,
          date: { $gte: startOfWeek, $lte: endOfWeek } // Filter by the current week's date range
        }
      },
      {
        $group: {
          _id: "$workoutType", // Group by workout type
          totalDuration: { $sum: "$duration" }, // Sum the total duration of workouts for each type
          totalCaloriesBurned: { $sum: "$caloriesBurned" } // Sum the total calories burned for each type
        }
      },
      {
        $project: {
          workoutType: "$_id", // Rename _id to workoutType for readability
          totalDuration: 1, // Include total duration in the response
          totalCaloriesBurned: 1, // Include total calories burned in the response
          _id: 0 // Exclude the default _id field
        }
      }
    ]);

    // Send the grouped workout data as a response
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching workout chart data:', error);
    res.status(500).json({ message: "Server error" });
  }
};



const getWorkoutDuration = async (req, res) => {
  try {
    const { authId } = req.params;

    // Get the current date
    const today = new Date();

    // Calculate the start of the week (Monday) and the end of the week (Sunday)
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Adjust the start of the week to Monday
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // If today is Sunday (0), set to 6 days ago; else subtract the current day - 1

    // Create an endOfWeek date for Sunday of the current week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to Monday to get Sunday

    const response = await Workout.aggregate([
      // Step 1: Match all workout entries for the given user within the current week (Monday to Sunday)
      {
        $match: {
          userId: authId,
          date: { $gte: startOfWeek, $lte: endOfWeek } // Filter for current week only
        }
      },
      // Step 2: Group by date and sum the calories burned for each date
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Group by date in YYYY-MM-DD format
          totalCaloriesBurned: { $sum: "$caloriesBurned" } // Sum calories burned
        }
      },
      // Step 3: Sort by date
      {
        $sort: { _id: 1 } // Sort by date ascending
      },
      // Step 4: Project the fields we need
      {
        $project: {
          date: "$_id", // Use _id as date
          totalCaloriesBurned: 1, // Total calories burned
          _id: 0 // Exclude _id from the output
        }
      }
    ]);

    // Respond with the formatted data
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createWorkout, getWorkout, getWorkoutChart, getWorkoutDuration };
