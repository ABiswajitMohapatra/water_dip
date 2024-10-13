import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps {
  onDateChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleFilter = () => {
    onDateChange({ start: startDate, end: endDate });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate as Date}
        endDate={endDate as Date}
        placeholderText="Start Date"
        isClearable
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate as Date}
        endDate={endDate as Date}
        minDate={startDate as Date}
        placeholderText="End Date"
        isClearable
      />
      <button onClick={handleFilter} disabled={!startDate || !endDate}>
        Filter
      </button>
    </div>
  );
};

export default DateRangePicker;
