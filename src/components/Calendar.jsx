import { useState } from 'react';
import dayjs from 'dayjs';

function Calendar({ onSelectDate }) {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);

  const startDay = currentMonth.startOf('month').startOf('week');
  const endDay = currentMonth.endOf('month').endOf('week');

  const days = [];
  let date = startDay;

  while (date.isBefore(endDay, 'day')) {
    days.push(date);
    date = date.add(1, 'day');
  }

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, 'month'));

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrev} className="text-blue-500">&lt;</button>
        <h2 className="text-lg font-semibold">{currentMonth.format('YYYY년 MM월')}</h2>
        <button onClick={handleNext} className="text-blue-500">&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center font-medium">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center mt-2">
        {days.map((day) => (
          <div
            key={day.format('YYYY-MM-DD')}
            onClick={() => onSelectDate(day.format('YYYY-MM-DD'))}
            className={`p-2 border text-sm hover:bg-blue-100 cursor-pointer ${
              day.format('MM') !== currentMonth.format('MM') ? 'text-gray-400' : ''
            }`}
          >
            {day.format('D')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
