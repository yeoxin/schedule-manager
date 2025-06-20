import { useState } from 'react';
import Calendar from './components/Calendar';
import ScheduleForm from './components/ScheduleForm';
import { getCategoryColor } from './utils/colorMap';

function App() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const handleAdd = (newSchedule) => {
    setSchedules([...schedules, newSchedule]);
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter(item => item.id !== id));
  };

  const filtered = selectedDate
    ? schedules.filter((s) => s.date === selectedDate)
    : schedules;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">일정 관리 시스템</h1>

      <Calendar onSelectDate={(date) => setSelectedDate(date)} />

      <ScheduleForm onAdd={handleAdd} />

      {selectedDate && (
        <p className="text-center text-sm text-gray-600 mb-2">
          📅 {selectedDate} 일정 보기
        </p>
      )}

<div className="space-y-2">
  {filtered.map((item) => (
    <div
      key={item.id}
      className="mt-2 border p-2 flex justify-between items-center"
      style={{
        borderLeft: `5px solid ${getCategoryColor(item.category)}`,
        backgroundColor: getCategoryColor(item.category) + '20',
        paddingLeft: '12px',
      }}
    >
      <div>
        <div>{item.date} {item.time}</div>
        <div>{item.title} ({item.category})</div>
      </div>
      <button
        onClick={() => handleDelete(item.id)}
        className="text-red-500 hover:text-red-700 ml-4"
      >
        ❌
      </button>
    </div>
  ))}
</div>

    </div>
  );
}

export default App;
