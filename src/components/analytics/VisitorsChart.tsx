import React from 'react';
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
  Filler
} from 'chart.js';
import { useAnalytics } from '../../hooks/useAnalytics';
import { formatDate } from '../../utils/date';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VisitorsChartProps {
  dateRange: '24h' | '7d' | '30d' | 'all';
}

export default function VisitorsChart({ dateRange }: VisitorsChartProps) {
  const { data, loading } = useAnalytics(dateRange);

  const chartData = {
    labels: data.map(item => formatDate(item.timestamp.toDate(), dateRange)),
    datasets: [
      {
        label: 'Visitors',
        data: data.map(item => item.value),
        fill: true,
        borderColor: 'rgb(31, 220, 234)',
        backgroundColor: 'rgba(31, 220, 234, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center text-white/70">Loading...</div>;
  }

  return (
    <div className="h-[300px]">
      <Line data={chartData} options={options} />
    </div>
  );
}