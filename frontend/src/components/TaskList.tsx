import api from '../api';
import type { Task } from '../types';

interface Props {
    tasks: Task[];
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (id: string) => void;
}

export const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }: Props) => {
    const handleStatusChange = async (id: string, status: string) => {
        try {
            const response = await api.patch<Task>(`/tasks/${id}/status`, { status });
            onTaskUpdated(response.data);
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            onTaskDeleted(id);
        } catch (err) {
            console.error('Failed to delete task', err);
        }
    };

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task._id} className="p-4 bg-white rounded shadow flex justify-between items-center text-gray-800">
                    <div>
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        {task.description && <p className="text-gray-600">{task.description}</p>}
                        <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${task.status === 'DONE' ? 'bg-green-100 text-green-800' :
                            task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                            {task.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {tasks.length === 0 && <p className="text-center text-gray-500">No tasks found.</p>}
        </div>
    );
};
