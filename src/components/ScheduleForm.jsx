import { useState, useEffect } from 'react';

function ScheduleForm({ onAdd, editingSchedule, onCancel }) {
  const [form, setForm] = useState({
    date: '',
    time: '',
    title: '',
    category: '공부',
  });

  useEffect(() => {
    if (editingSchedule) {
      setForm(editingSchedule);
    }
  }, [editingSchedule]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.title) return;
    onAdd(form);
    setForm({ date: '', time: '', title: '', category: '공부' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="title"
        placeholder="제목"
        value={form.title}
        onChange={handleChange}
        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="공부">공부</option>
        <option value="운동">운동</option>
        <option value="약속">약속</option>
        <option value="기타">기타</option>
      </select>

      <div className="flex gap-3 justify-end">
        {editingSchedule && (
          <button
            type="button"
            onClick={() => {
              setForm({ date: '', time: '', title: '', category: '공부' });
              onCancel();
            }}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingSchedule ? '수정 완료' : '일정 등록'}
        </button>
      </div>
    </form>
  );
}

export default ScheduleForm;
