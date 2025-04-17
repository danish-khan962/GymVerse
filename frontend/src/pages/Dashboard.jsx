import React, { useState, useEffect, useCallback } from 'react';
import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { useAuth, useUser } from "@clerk/clerk-react";
import { userProfile, getWorkoutChart, fetchDashboardData } from '../utils/fetchData';
import DistanceBarGraph from '../components/BarChart';



import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CaloriesLineChart from '../components/LineGraph';


ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth()
  const [score, setScore] = useState(0)



  const [workoutChartData, setWorkoutData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Workout Types',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  });
  const fetchDashboard = useCallback(async () => {
    try {
      const response = await fetchDashboardData(user?.id)
      const data = response;

      const token = await getToken()
      const userdata = await userProfile(token, user?.id)
      setScore(userdata?.score)

      setDashboardData({
        caloriesBurned: data.totalCaloriesBurned || 0,
        distanceCovered: data.totalDistance || 0,
        stepsTaken: data.totalSteps || 0,
        timeSpent: `${Math.floor(data.totalTimeSpent / 60)} hours ${data.totalTimeSpent % 60} minutes`, // Converting minutes to hours and minutes
        achievedGoals: data.achievedGoals || 0,
        notAchievedGoals: data.notAchievedGoals || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, [getToken, user?.id])

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await getWorkoutChart(user?.id);
        setWorkoutData(response);

        // Assuming the response structure is correct
        const labels = response?.map(item => item.workoutType);
        const dataValues = response?.map(item => item.totalDuration);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Workout Types',
              data: dataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchDashboard()
    fetchWorkoutData();
  }, [user?.id, fetchDashboard]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Workout Types for This Week',
      },
    },
  };

  // State for storing the values of each box
  const [dashboardData, setDashboardData] = useState({
    caloriesBurned: 0,
    distanceCovered: 0,
    stepsTaken: 0,
    timeSpent: '0 hours',
    achievedGoals: 0,
    notAchievedGoals: 0,
  });




  return (
    <Stack spacing={8} p={8}>
      {/* Upper Section with 6 boxes */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {/* First Row */}
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <Text fontWeight="bold" color="gray.300" fontSize={'large'}>Total Calories Burned</Text>
          <Text mt={2} color="white">{dashboardData.caloriesBurned} kcal</Text>
        </Box>
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <Text fontWeight="bold" color="gray.300" fontSize={'large'}>Total Distance Covered</Text>
          <Text mt={2} color="white">{dashboardData.distanceCovered} km</Text>
        </Box>
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <Text fontWeight="bold" color="gray.300" fontSize={'large'}>Total Steps Taken</Text>
          <Text mt={2} color="white">{dashboardData.stepsTaken} steps</Text>
        </Box>

        {/* Second Row */}
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <Text fontWeight="bold" color="gray.300" fontSize={'large'}>Total Time Spent</Text>
          <Text mt={2} color="white">{dashboardData.timeSpent}</Text>
        </Box>
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <Text fontWeight="bold" color="gray.300" fontSize={'large'}>Achieved Goals</Text>
          <Text mt={2} color="white">{dashboardData.achievedGoals}/{dashboardData.achievedGoals + dashboardData.notAchievedGoals}</Text>
        </Box>
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <Text fontWeight="bold" color="gray.300" fontSize={'large'}>Not Achieved Goals</Text>
          <Text mt={2} color="white">{dashboardData.notAchievedGoals}/{dashboardData.achievedGoals + dashboardData.notAchievedGoals}</Text>
        </Box>
      </SimpleGrid>

      {/* Lower Section with Charts */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <Pie data={chartData} options={options} />
        </Box>
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <DistanceBarGraph />
        </Box>
        <Box p={5} shadow="2xl" borderWidth="1px" borderColor={'gray.900'} borderRadius="md" bg="gray.800">
          <CaloriesLineChart />
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default Dashboard;
