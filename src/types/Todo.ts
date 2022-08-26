export enum Priority {
    QUICK = "急",
    NORMAL = "緩"
}

export interface Todo {
    index: number;
    content: string;
    completed: boolean;
    priority: Priority;
    time: string
}