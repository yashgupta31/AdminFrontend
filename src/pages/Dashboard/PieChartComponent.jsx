import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({overviewDuration}) => {
  const {appointments, todaysAppointments}= useSelector(state=> state.appointments);

  const statusCount= ((overviewDuration== 'today') ? todaysAppointments: appointments).reduce((acc, appt)=>{
    
    if(appt.status== 'Pending' || appt.status== 'Confirmed'){
      acc['Pending']= acc['Pending']+1;
    }else{
      acc[appt.status]= acc[appt.status]+1;
    }
    return acc;
  }, {Completed: 0, Pending: 0, Cancelled: 0, Expired: 0})
  console.log(statusCount)

  const data = {
    labels: ['Completed', 'Pending', 'Cancelled', 'Expired'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [statusCount.Completed, statusCount.Pending, statusCount.Cancelled, statusCount.Expired],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
          '#282828'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data}/>;
};

export default PieChartComponent;
