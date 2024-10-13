import React from "react";
import ReactApexChart from "react-apexcharts";
import { Booking } from "../../types/Bookings";

interface TimeSeriesChartProps {
  data: Booking[];
}

function monthNameToInt(month: string): number {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames.indexOf(month);
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  // Aggregate visitors per day
  const visitorsPerDay: { [date: string]: number } = {};

  data.forEach((booking) => {
    const year = parseInt(booking.arrival_date_year);
    const month = monthNameToInt(booking.arrival_date_month);
    const day = parseInt(booking.arrival_date_day_of_month);

    if (year && month >= 0 && day) {
      const date = new Date(year, month, day).getTime();
      const totalVisitors =
        parseInt(booking.adults) +
        parseInt(booking.children || "0") +
        parseInt(booking.babies || "0");

      if (visitorsPerDay[date]) {
        visitorsPerDay[date] += totalVisitors;
      } else {
        visitorsPerDay[date] = totalVisitors;
      }
    }
  });

  const seriesData = Object.keys(visitorsPerDay)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((date) => {
      const timestamp = parseInt(date);
      return !isNaN(timestamp)
        ? { x: timestamp, y: visitorsPerDay[date] }
        : null;
    })
    .filter((item) => item !== null); // Filter out invalid entries

  const series = [
    {
      name: "Visitors",
      data: seriesData,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Number of Visitors",
      },
    },
    title: {
      text: "Number of Visitors Per Day",
      align: "left",
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default TimeSeriesChart;
