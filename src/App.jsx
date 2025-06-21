import { useState } from 'react';
import Calendar from './components/Calendar';
import ScheduleForm from './components/ScheduleForm';
import { getCategoryColor } from './utils/colorMap';

function App() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleAdd = (newSchedule) => {
    setSchedules([...schedules, newSchedule]);
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter(item => item.id !== id));
  };

  const addTask = () => {
    if (taskInput.trim() === '') return;
    setTasks([...tasks, { text: taskInput, done: false }]);
    setTaskInput('');
  };
  
  const toggleDone = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };
  
  const filtered = selectedDate
    ? schedules.filter((s) => s.date === selectedDate)
    : schedules;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">일정 관리 시스템</h1>

      <Calendar onSelectDate={(date) => setSelectedDate(date)} />

      <ScheduleForm onAdd={handleAdd} />

      <div className="mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">📝 할 일 리스트</h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            className="flex-1 border p-2 rounded"
            placeholder="할 일을 입력하세요"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
            추가
          </button>
        </div>

        <ul className="space-y-1">
          {tasks.map((task, index) => (
            <li
              key={index}
              onClick={() => toggleDone(index)}
              className={`cursor-pointer p-2 border rounded flex justify-between items-center${
                task.done ? 'line-through text-gray-500 bg-gray-100' : ''
              }`}
            >
              {task.text}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm ml-2"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

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
