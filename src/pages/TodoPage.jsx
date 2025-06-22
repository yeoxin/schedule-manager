import { useState } from 'react';

function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() === '') return;
    setTasks([...tasks, { text: taskInput, done: false }]);
    setTaskInput('');
  };

  const toggleDone = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">할 일 리스트</h1>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-grow border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-5 rounded hover:bg-blue-700 transition"
        >
          추가
        </button>
      </div>

      <ul className="space-y-2 max-h-[400px] overflow-auto">
        {tasks.length === 0 && <p className="text-center text-gray-400">할 일이 없습니다.</p>}
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleDone(index)}
            className={`cursor-pointer p-3 border rounded flex justify-between items-center ${
              task.done ? 'line-through text-gray-400 bg-gray-100' : ''
            }`}
          >
            {task.text}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(index);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm ml-3"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoPage;
