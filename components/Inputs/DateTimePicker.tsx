import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function DateTimePicker({ setTimeSelected } : { setTimeSelected: (time: Date) => void }) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => { setStartDate(date); setTimeSelected(date); }}
      showTimeSelect
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      className="py-3 px-2 border-none shadow-none w-56"
      calendarClassName="inline-flex"
    />
  );
};

export default DateTimePicker;