import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import TodoPage from './pages/TodoPage';
import AllSchedulesPage from './pages/AllSchedulesPage';
import { useState } from 'react';

function App() {
  const [schedules, setSchedules] = useState([]);

  return (
    <Router>
      <div className="bg-blue-100 min-h-screen p-6">
        <nav className="mb-6 flex gap-6 justify-center bg-white rounded-lg shadow-md py-3">
          <Link to="/calendar" className="text-blue-600 font-semibold hover:underline">일정 관리</Link>
          <Link to="/todo" className="text-blue-600 font-semibold hover:underline">할 일 리스트</Link>
          <Link to="/all" className="text-blue-600 font-semibold hover:underline">전체 일정</Link>
        </nav>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <Routes>
            <Route path="/calendar" element={<CalendarPage schedules={schedules} setSchedules={setSchedules} />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/all" element={<AllSchedulesPage schedules={schedules} />} />
            <Route path="*" element={<CalendarPage schedules={schedules} setSchedules={setSchedules} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
