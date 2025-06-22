import { useState } from 'react';
import dayjs from 'dayjs';

function Calendar({ onSelectDate, schedules = [] }) {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);

  const startDay = currentMonth.startOf('month').startOf('week');
  const endDay = currentMonth.endOf('month').endOf('week');

  const hasSchedule = (dateStr) =>
    schedules.some(s => s.date === dateStr);

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
        <button onClick={handlePrev} className="text-blue-600 hover:text-blue-800">&lt;</button>
        <h2 className="text-lg font-semibold">{currentMonth.format('YYYY년 MM월')}</h2>
        <button onClick={handleNext} className="text-blue-600 hover:text-blue-800">&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center font-medium select-none">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d} className="py-1 border-b border-gray-300">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center mt-2 gap-1">
        {days.map((day) => {
          const dateStr = day.format('YYYY-MM-DD');
          return (
            <div
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={`relative p-2 rounded cursor-pointer hover:bg-blue-200 ${
                day.format('MM') !== currentMonth.format('MM') ? 'text-gray-400' : ''
              }`}
            >
              {day.format('D')}
              {hasSchedule(dateStr) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
