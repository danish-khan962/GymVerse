import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useUser } from '@clerk/clerk-react';
import { getActivityChart } from '../utils/fetchData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DistanceBarGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const response = await getActivityChart(user.id);
          if (response.message) {
            // If there is a message in the response, it means no data was found
            setError(response.message);
            setGraphData([]);
          } else {
            setGraphData(response);
            setError(null);
          }
        } catch (err) {
          setError('Failed to fetch data');
          setGraphData([]);
        }
      }
    };

    fetchData();
  }, [user]);

  // Prepare the labels (dates) and data (distance)
  const labels = graphData.length > 0 ? graphData.map((item) => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}/${date.getDate()}`; // Format as MM/DD
  }) : ['No Data'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Distance Covered (km)',
        data: graphData.length > 0 ? graphData.map((item) => item.totalDistance) : [0],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart can grow to fit its container
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distance Covered This Week',
      },
    },
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
          text: 'Distance (km)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {error ? (
        <p className='text-gray-400'>NO Data To show please do some activity</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default DistanceBarGraph;
