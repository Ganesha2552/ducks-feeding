import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const Timepicker = () => {
  const [time, setTime] = useState('');

  return (
    <DatePicker
      mode="time"
      minuteInterval={5}
      onTimeChange={selectedTime => setTime(selectedTime)}
    />
  );
};
export default Timepicker;
