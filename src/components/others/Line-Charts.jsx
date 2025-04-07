"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function LineChart({ data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          fill: true,
          borderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1f2937",
            titleColor: "#f3f4f6",
            bodyColor: "#f3f4f6",
            borderColor: "#374151",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: (items) => `${items[0].label}`,
              label: (item) => `${item.formattedValue} minutes`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(75, 85, 99, 0.2)",
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(75, 85, 99, 0.2)",
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af",
              stepSize: 20,
              callback: (value) => (value === 0 ? "0" : value),
            },
            max: 60,
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    })

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}
