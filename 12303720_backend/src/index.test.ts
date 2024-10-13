import request from "supertest";
import app, { parseDate } from "./index";
import { Booking } from "./types";

describe("GET /api/bookings", () => {
  it("should return 400 if startDate or endDate is missing", async () => {
    const res = await request(app).get("/api/bookings");
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("startDate and endDate are required.");
  });

  it("should return filtered bookings within date range", async () => {
    const res = await request(app)
      .get("/api/bookings")
      .query({ startDate: "2015-01-01", endDate: "2015-12-31" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((booking: Booking) => {
      const arrival = parseDate(booking);
      expect(arrival >= new Date("2015-01-01")).toBe(true);
      expect(arrival <= new Date("2015-12-31")).toBe(true);
    });
  });

  it("should return empty array if no bookings in range", async () => {
    const res = await request(app)
      .get("/api/bookings")
      .query({ startDate: "1900-01-01", endDate: "1900-12-31" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
