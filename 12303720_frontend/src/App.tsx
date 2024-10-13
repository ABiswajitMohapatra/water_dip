import axios from "axios";
import React, { useEffect, useState } from "react";
import ColumnChart from "../components/Charts/ColumnChart";
import SparklineChart from "../components/Charts/SparklineChart";
import TimeSeriesChart from "../components/Charts/TimeSeriesChart";
import DateRangePicker from "../components/DateRangePicker/DateRangePicker";
import { Booking } from "../types/Bookings";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      const fetchData = async () => {
        try {
          const response = await axios.get<Booking[]>(
            "http://localhost:4000/api/bookings",
            {
              params: {
                startDate: dateRange.start?.toISOString().split("T")[0],
                endDate: dateRange.end?.toISOString().split("T")[0],
              },
            }
          );
          console.log("Fetched bookings:", response.data); // Log fetched data
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };

      fetchData();
    }
  }, [dateRange]);

  return (
    <div className="App">
      <h1>Hotel Booking Dashboard</h1>
      <DateRangePicker onDateChange={setDateRange} />
      <div className="charts-container">
        <div className="chart">
          <TimeSeriesChart data={bookings} />
        </div>
        <div className="chart">
          <ColumnChart data={bookings} />
        </div>
        <div className="sparkline-container">
          <div className="sparkline">
            <SparklineChart data={bookings} type="adults" />
          </div>
          <div className="sparkline">
            <SparklineChart data={bookings} type="children" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
