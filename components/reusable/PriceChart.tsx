'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { MarketChart } from '@/lib/types';

Chart.register(...registerables);

interface PriceChartProps {
  chartData: MarketChart;
}

export default function PriceChart({ chartData }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 216, 151, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 216, 151, 0)');

        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [
              {
                label: 'Price (USD)',
                data: chartData.prices.map(([timestamp, price]) => ({
                  x: timestamp,
                  y: price,
                })),
                borderColor: '#00d897',
                backgroundColor: gradient,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'MMM d',
                  },
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'var(--foreground)',
                },
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Price (USD)',
                  color: 'var(--foreground)',
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'var(--foreground)',
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'var(--card-bg)',
                titleColor: 'var(--foreground)',
                bodyColor: 'var(--foreground)',
                callbacks: {
                  label: (context) => `$${context.parsed.y.toLocaleString()}`,
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return <div className="card p-4 h-96"><canvas ref={canvasRef} /></div>;
}