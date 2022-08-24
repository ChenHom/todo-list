import { Task } from "./Task";

export function serializer(action: 'serialize' | 'deserialize', tasks?: Task[]): void | Task[] {
    if (!localStorage) {
        throw new Error("need the localStorage!");
    }

    const SERIALIZE_KEY = 'task_todos'

    if (action === 'serialize') {
        localStorage.setItem(SERIALIZE_KEY, JSON.stringify(tasks))
    } else {
        return JSON.parse(localStorage.getItem(SERIALIZE_KEY) as string)
    }
}