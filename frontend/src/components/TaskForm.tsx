import { useState } from 'react';
import api from '../api';
import type { Task } from '../types';

interface Props {
    onTaskCreated: (task: Task) => void;
}

export const TaskForm = ({ onTaskCreated }: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            setError('Title is required');
            return;
        }
        try {
            const response = await api.post<Task>('/tasks', { title, description });
            onTaskCreated(response.data);
            setTitle('');
            setDescription('');
            setError('');
        } catch (err) {
            console.error('Failed to create task', err);
            setError('Failed to create task');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow text-gray-800">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Task title"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Task description"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Task
            </button>
        </form>
    );
};
