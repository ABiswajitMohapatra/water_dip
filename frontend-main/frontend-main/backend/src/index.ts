import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { Booking, Request } from "./types";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Load data
const dataPath = path.join(__dirname, "data.json");
const rawData = fs.readFileSync(dataPath, "utf-8");
const bookings: Booking[] = JSON.parse(rawData);

// Helper function to parse date
export const parseDate = (booking: Booking): Date => {
  const monthMap: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const year = parseInt(booking.arrival_date_year);
  const month = monthMap[booking.arrival_date_month];
  const day = parseInt(booking.arrival_date_day_of_month);

  return new Date(year, month, day);
};

// API Endpoint to get bookings within date range
app.get("/api/bookings", (req: Request, res: any) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "startDate and endDate are required." });
  }

  const start = new Date(startDate as string);
  const end = new Date(endDate as string);

  const filteredBookings = bookings.filter((booking) => {
    const arrival = parseDate(booking);
    return arrival >= start && arrival <= end;
  });

  res.json(filteredBookings);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
