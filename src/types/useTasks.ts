import { ref } from "vue"
import { isSameDays, pickLocal24HourTimeString, pickLocalDateString } from "../utils/date"
import { Task } from "./Task"
import { Priority, Todo } from "./Todo"

const useTasks = () => {
    const tasks = ref<Task[]>([])

    const createTodo = (content: string, priority: Priority): Todo => {
        return {
            index: Date.now(),
            content: content,
            completed: false,
            priority: priority,
            time: pickLocal24HourTimeString()
        }
    }

    const addTodo = (content: string, priority: Priority = Priority.NORMAL) => {
        const date = pickLocalDateString()
        const todo = createTodo(content, priority)
        const task = findTask(date)

        if (task) {
            task.todos.push(todo)
        } else {
            tasks.value.push({ date: date, todos: [todo] })
        }
    }

    const todoClearCompleted = () => {
        tasks.value = tasks.value.filter(task => task.todos = task.todos.filter(todo => todo.completed === false))
        tasks.value = tasks.value.filter(task => task.todos.length)
    }

    const todoCompleted = (date: string, todoIndex: number, complete = true) => {
        let todo = findTodo(findTask(date), todoIndex)

        if (todo !== undefined) {
            todo.completed = complete
        }
    }

    const findTask = (date: string): Task | undefined =>
        tasks.value.find(task => isSameDays(task.date, date))

    const findTodo = (todo: Task | undefined, index: number): Todo | undefined => {
        if (todo !== undefined) {
            return todo.todos.find(todo => index === todo.index)
        }
    }

    return {
        tasks,
        createTodo,
        addTodo,
        todoClearCompleted,
        todoCompleted,
        findTask,
        findTodo
    }
}

export default useTasks