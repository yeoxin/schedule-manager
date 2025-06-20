import { useState } from 'react';

function ScheduleForm({ onAdd }) {
  const [form, setForm] = useState({
    date: '',
    time: '',
    title: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.title) return;
    onAdd({ ...form, id: Date.now() });
    setForm({ date: '', time: '', title: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-1 w-full" />
      <input name="time" type="time" value={form.time} onChange={handleChange} className="border p-1 w-full" />
      <input name="title" placeholder="제목" value={form.title} onChange={handleChange} className="border p-1 w-full" />
      <input name="category" placeholder="카테고리" value={form.category} onChange={handleChange} className="border p-1 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">일정 등록</button>
    </form>
  );
}

export default ScheduleForm;
