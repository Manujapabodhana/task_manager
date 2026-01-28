export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
}
