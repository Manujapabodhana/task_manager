import { useEffect, useState } from 'react';
import api from './api';
import type { Task } from './types';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleTaskDeleted = (id: string) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
        <TaskForm onTaskCreated={handleTaskCreated} />
        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
