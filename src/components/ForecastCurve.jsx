/**
 * FORECAST CURVE COMPONENT
 * Courbe de prévisions budget/date (Chart.js)
 */

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

export default function ForecastCurve({ forecasts = [], type = 'budget' }) {
  // Préparer les données
  const labels = forecasts.map(f => f.name || f.initiative_name);
  const budgets = forecasts.map(f => f.budget || 0);
  const forecasted = forecasts.map(f => f.forecast_cost || f.budget || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Budget initial',
        data: budgets,
        borderColor: '#4A9EFF',
        backgroundColor: 'rgba(74, 158, 255, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Prévision',
        data: forecasted,
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9CA3AF',
          font: {
            size: 12,
            weight: 300
          },
          padding: 20,
          usePointStyle: true
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#D4AF37',
        bodyColor: '#fff',
        borderColor: '#D4AF37',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 10,
            weight: 300
          },
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 10,
            weight: 300
          },
          callback: function(value) {
            return new Intl.NumberFormat('fr-FR', {
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value) + ' €';
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <div className="w-full h-[400px] bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
      {forecasts.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 font-light">Aucune donnée de prévision disponible</p>
        </div>
      )}
    </div>
  );
}
