import { useState } from 'react';
import { getCategoryColor } from '../utils/colorMap';

function AllSchedulesPage() {
  const [schedules, setSchedules] = useState(() => {
    const stored = localStorage.getItem('schedules');
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">전체 일정</h1>
      <div className="space-y-3 max-h-[500px] overflow-auto">
        {schedules.length === 0 && (
          <p className="text-center text-gray-400">등록된 일정이 없습니다.</p>
        )}
        {schedules.map((item) => (
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
              <div className="text-sm text-gray-700">{item.date} {item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSchedulesPage;
