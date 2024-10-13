import React from "react";
import ReactApexChart from "react-apexcharts";
import { Booking } from "../../types/Bookings";

interface SparklineChartProps {
  data: Booking[];
  type: "adults" | "children";
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, type }) => {
  let total: number = 0;
  const dailyTotals: { [date: string]: number } = {};

  data.forEach((booking) => {
    const date = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
    const count = parseInt(booking[type]);

    total += count;

    if (dailyTotals[date]) {
      dailyTotals[date] += count;
    } else {
      dailyTotals[date] = count;
    }
  });

  // Sort dates
  const sortedDates = Object.keys(dailyTotals).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const series = [
    {
      name: `Total ${type.charAt(0).toUpperCase() + type.slice(1)} Visitors`,
      data: sortedDates.map((date) => dailyTotals[date]),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: `Total ${
        type.charAt(0).toUpperCase() + type.slice(1)
      } Visitors: ${total}`,
      align: "left",
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={160}
      />
    </div>
  );
};

export default SparklineChart;
