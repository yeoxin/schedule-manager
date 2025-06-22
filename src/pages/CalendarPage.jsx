import { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import ScheduleForm from '../components/ScheduleForm';
import { getCategoryColor } from '../utils/colorMap';

function CalendarPage() {
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem('schedules');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  const handleAdd = (newSchedule) => {
    if (editingSchedule) {
      setSchedules(
        schedules.map((s) =>
          s.id === editingSchedule.id ? { ...newSchedule, id: editingSchedule.id } : s
        )
      );
      setEditingSchedule(null);
    } else {
      setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
    }
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
    if (editingSchedule && editingSchedule.id === id) {
      setEditingSchedule(null);
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setSelectedDate(schedule.date);
  };

  const filtered = selectedDate
    ? schedules.filter((s) => s.date === selectedDate)
    : schedules;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">일정 관리 시스템</h1>
      <Calendar onSelectDate={(date) => setSelectedDate(date)} schedules={schedules} />

      <ScheduleForm
        onAdd={handleAdd}
        editingSchedule={editingSchedule}
        onCancel={() => setEditingSchedule(null)}
      />

      {selectedDate && (
        <p className="text-center text-sm text-gray-600 mb-2">📅 {selectedDate} 일정 보기</p>
      )}

      <div className="space-y-3 max-h-[300px] overflow-auto">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400">일정이 없습니다.</p>
        )}
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border rounded p-3 flex justify-between items-center"
            style={{
              borderLeft: `5px solid ${getCategoryColor(item.category)}`,
              backgroundColor: getCategoryColor(item.category) + '20',
              paddingLeft: '12px',
            }}
          >
            <div>
              <div className="font-semibold">
                {item.title}{' '}
                <span className="text-sm text-gray-600">({item.category})</span>
              </div>
              <div className="text-sm text-gray-700">
                {item.date} {item.time}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 hover:text-blue-800"
                aria-label="수정"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800"
                aria-label="삭제"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CalendarPage;
