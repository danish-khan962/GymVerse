import axios from "axios";


const url = 'https://gymverseassignment.onrender.com'



export const exerciseOptions = {
  method: 'GET',

  headers: {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',

    'x-rapidapi-key': "647d6fb919msh5c1033cafbe8ac8p1b147bjsnf4b7d2c8e890 "


  }
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};


export const userProfile = async (accessToken, authID) => {

  const response = await axios.get(`${url}/getUserProfile/${authID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data
}

export const updateDoctorProfile = async (accessToken, authId, data) => {
  try {
    const response = await axios.put(`${url}/updateDoctorProfile/${authId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Rethrow the error so it can be handled by the calling code
  }
};

export const createWorkout = async (data) => {
  try {
    const response = await axios.post(`${url}/create-workout`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
};

export const getWorkout = async (authId) => {
  try {
    const response = await axios.get(`${url}/get-workout/${authId}`)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getWorkoutChart = async (authId) => {
  try {
    const response = await axios.get(`${url}/get-workout-chart/${authId}`)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const createActivity = async (data) => {
  try {
    const response = await axios.post(`${url}/create-activity`, data)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getActivity = async (authId) => {
  try {
  const response = await axios.get(`${url}/get-activity/${authId}`)
  return response.data
} catch (error) {
  console.log(error)
  return error
}
}

export const getActivityChart = async (authId) => {
  try{
const response = await axios.get(`${url}/get-activity-chart/${authId}`)
return response.data
  }catch(error){
    console.log(error)
  }
}

export const createGoal = async (data) => {
  try{
    const response = await axios.post(`${url}/create-goal`, data)
    return response.data
  }catch(error){
    console.log(error)
    return error
  }
}

export const getGoals = async (authId) => {
  try {
    const response  = await axios.get(`${url}/get-goal/${authId}`)
    return response.data.goals
  } catch (error) {
    console.log(error.response.data)
  }
 
}


export const deleteGoal = async (goalId) => {
  try {
    const response  = await axios.delete(`${url}/delete-goal/${goalId}`)
    return response.data
  } catch (error) {
    console.log(error.response.data)
  }
 
}


export const updateGoal = async (goalId) => {
  try {
    const response  = await axios.put(`${url}/update-goal/${goalId}`)
    return response.data
  } catch (error) {
    console.log(error.response.data)
  }
 
}

export const getWorkoutCalories = async (authId) => {
  try {
    const response = await axios.get(`${url}/get-workout-calories/${authId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const getCaloriesChart = async (authId) => {
  console.log(authId)
  try {
    const response = await axios.get(`${url}/get-workout-calories/${authId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const fetchDashboardData = async (authId) => {
  try {
    const response = await axios.get(`${url}/dashboard/${authId}`)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}