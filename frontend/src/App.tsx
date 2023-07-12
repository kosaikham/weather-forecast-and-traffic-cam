import { useState, useEffect } from 'react';
import { DatePicker, TimePicker, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ResultComponent } from './components/ResultComponent';
import { useFetch } from './hooks/useFetch';
import { APIResponse } from './types';
import './App.css';

dayjs.extend(customParseFormat);

const { Option } = Select;

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [datetimeString, setDatetimeString] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<APIResponse | undefined>();
  const [data, setData] = useState<APIResponse[]>([]);

  const [response, loading] = useFetch(datetimeString);

  useEffect(() => {
    setData(response);
  },[response])

  useEffect(() => {
    if(selectedDate && selectedTime){
      // call API
      const date = selectedDate.toISOString().substr(0,10); // 2023-10-05
      const time = selectedTime.toISOString().substr(10,9); // T17:25:16
      setSelectedOption(undefined);
      setDatetimeString(date + time);
    }else{
      setData([]);
    }
  },[selectedDate, selectedTime])

  const handleDateChange: DatePickerProps['onChange']= (date: Dayjs | null, _: string) => {
    setSelectedDate(date ? date.toDate() : null);
  };

  const handleTimeChange = (time: Dayjs | null, _: string) => {
    setSelectedTime(time ? time.toDate() : null);
  };

  const handleOptionChange = (id: number) => {
    const selectedLocation = data?.find(location => location.id === id);
    setSelectedOption(selectedLocation);
  };
  
  return (
    <div className="container">
      <h2>Weather Forecast & Traffic Cam Website</h2>
      <div className="content">
        <div className="date-time-picker">
          <DatePicker onChange={handleDateChange} />
          <TimePicker onChange={handleTimeChange} />
          <Select<number> className="dropdown" disabled={loading || !data || !data.length} onChange={handleOptionChange} placeholder="Select an location">
            {data.length > 0 && data.map(location => (<Option value={location.id} key={location.id}>{location.name}</Option>))}
          </Select>
        </div>
        {selectedOption && <ResultComponent selectedOption={selectedOption} visible={data.length > 0} />}
      </div>
    </div>
  );
}

export default App;
