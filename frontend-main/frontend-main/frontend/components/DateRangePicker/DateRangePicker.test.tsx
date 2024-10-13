import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import DateRangePicker from "./DateRangePicker";

describe("DateRangePicker", () => {
  it("renders DateRangePicker and handles date selection", () => {
    const mockOnDateChange = vi.fn(); // Change from jest.fn() to vi.fn()
    const { getByPlaceholderText, getByText } = render(
      <DateRangePicker onDateChange={mockOnDateChange} />
    );

    const startDateInput = getByPlaceholderText(
      "Start Date"
    ) as HTMLInputElement;
    const endDateInput = getByPlaceholderText("End Date") as HTMLInputElement;
    const filterButton = getByText("Filter");

    // Simulate date selection
    fireEvent.change(startDateInput, { target: { value: "2020-01-01" } });
    fireEvent.change(endDateInput, { target: { value: "2020-12-31" } });

    // Click filter
    fireEvent.click(filterButton);

    expect(mockOnDateChange).toHaveBeenCalled();
  });

  it("disables filter button if start or end date is missing", () => {
    const mockOnDateChange = vi.fn(); // Change from jest.fn() to vi.fn()
    const { getByPlaceholderText, getByText } = render(
      <DateRangePicker onDateChange={mockOnDateChange} />
    );

    const filterButton = getByText("Filter");

    // Initially, the filter button should be disabled
    expect(filterButton).toBeDisabled();

    // Set start date
    const startDateInput = getByPlaceholderText(
      "Start Date"
    ) as HTMLInputElement;
    fireEvent.change(startDateInput, { target: { value: "2020-01-01" } });

    // Still disabled because end date is missing
    expect(filterButton).toBeDisabled();

    // Set end date
    const endDateInput = getByPlaceholderText("End Date") as HTMLInputElement;
    fireEvent.change(endDateInput, { target: { value: "2020-12-31" } });

    // Now it should be enabled
    expect(filterButton).toBeEnabled();
  });
});
