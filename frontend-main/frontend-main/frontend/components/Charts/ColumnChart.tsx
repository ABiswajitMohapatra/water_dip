import React from "react";
import ReactApexChart from "react-apexcharts";
import { Booking } from "../../types/Bookings";

interface ColumnChartProps {
  data: Booking[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  // Aggregate visitors per country
  const visitorsPerCountry: { [country: string]: number } = {};

  data.forEach((booking) => {
    const country = booking.country || "Unknown";
    const totalVisitors =
      parseInt(booking.adults) +
      parseInt(booking.children || "0") +
      parseInt(booking.babies || "0");

    if (visitorsPerCountry[country]) {
      visitorsPerCountry[country] += totalVisitors;
    } else {
      visitorsPerCountry[country] = totalVisitors;
    }
  });

  const countries = Object.keys(visitorsPerCountry);
  const visitors = Object.values(visitorsPerCountry);

  const series = [
    {
      name: "Visitors",
      data: visitors,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: countries,
      labels: {
        rotate: -45,
      },
    },
    title: {
      text: "Number of Visitors Per Country",
      align: "left",
    },
    dataLabels: {
      enabled: true,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ColumnChart;
