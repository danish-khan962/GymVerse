import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getCaloriesChart } from '../utils/fetchData';
import { useUser } from '@clerk/clerk-react';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CaloriesLineChart = () => {
  const {user} = useUser()
  const [weeklyData, setWeeklyData] = useState([]);

  const dates = weeklyData.map(item => new Date(item.date).toLocaleDateString());
  const caloriesBurnedData = weeklyData.map(item => item.totalCaloriesBurned);

  const data = {
    labels: dates, // Date labels
    datasets: [
      {
        label: 'Calories Burned',
        data: caloriesBurnedData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true, // Fill the area below the line
        tension: 0.4, // Curve the line a bit
      },
    ],
  };

  // Uncomment this section when using real API
useEffect(() => {
  const fetchCalories = async () => {
    const response = await getCaloriesChart(user?.id)
    setWeeklyData(response)
  }

  fetchCalories()
}, [user?.id])

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Calories Burned',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CaloriesLineChart;
