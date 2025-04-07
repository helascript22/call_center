// src/components/CallManagementChart.js

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useMemo, useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CallManagementChart = () => {
  const chartData = useMemo(() => [
    { value: 19, time: '8.00 am', color: 'rgba(29, 78, 216, 0.6)' },
    { value: 24, time: '9.00 am', color: 'rgba(71, 85, 105, 0.6)' },
    { value: 29, time: '10.00 am', color: 'rgba(29, 78, 216, 0.6)' },
    { value: 16, time: '11.00 am', color: 'rgba(71, 85, 105, 0.6)' },
    { value: 31, time: '12.00 pm', color: 'rgba(29, 78, 216, 0.6)' },
    { value: 23, time: '1.00 pm', color: 'rgba(71, 85, 105, 0.6)' },
    { value: 40, time: '2.00 pm', color: 'rgba(29, 78, 216, 0.6)' },
    { value: 15, time: '3.00 pm', color: 'rgba(71, 85, 105, 0.6)' },
    { value: 14, time: '4.00 pm', color: 'rgba(29, 78, 216, 0.6)' },
    { value: 25, time: '5.00 pm', color: 'rgba(71, 85, 105, 0.6)' },
    { value: 40, time: '6.00 pm', color: 'rgba(29, 78, 216, 0.6)' },
    { value: 11, time: '7.00 pm', color: 'rgba(71, 85, 105, 0.6)' },
  ], []) 

  const [data, setData] = useState()

  useEffect(() => {
    const labels = chartData.map(item => item.time)
    const values = chartData.map(item => item.value)
    const backgroundColors = chartData.map(item => item.color)

    setData({
      labels,
      datasets: [
        {
          label: 'Calls',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    })
  }, [chartData]) 

  return data ? (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  ) : null
}

export default CallManagementChart
