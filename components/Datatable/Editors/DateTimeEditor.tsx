/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle } from "react";
import DateTimePicker from "../../Inputs/DateTimePicker";
import { format } from 'date-fns';


export default forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateChange(d) {
    console.log(d);
    if (d) {
      d.setHours(0, 0, 0, 0);
    }
    setSelectedDate(d);
  }

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        let dateString = null;
        if (selectedDate) {
          dateString = format(selectedDate, 'PPpp	');
        }
        console.log(dateString);
        return dateString;
      },
      isCancelAfterEnd: () => {
        return !selectedDate;
      },
      afterGuiAttached: () => {
        if (!props.value) {
          return;
        }
        const [_, day, month, year] = props.value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        let selectedDate = new Date(year, month - 1, day);
        setSelectedDate(selectedDate);
      }
    };
  });

  return (
    <DateTimePicker setTimeSelected={handleDateChange}/>
  )
});
