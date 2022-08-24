import { render, fireEvent, screen } from '@testing-library/vue'
import App from './App.vue'
import { Todo } from './types/Todo'

const todoFactory = (todo?: Partial<Todo>): Todo => ({
    index: Date.now(),
    content: 'todo content',
    completed: false,
    time: new Date().toLocaleTimeString("zh-TW", { hour12: false }),
    ...todo
})

beforeEach(() => localStorage.clear())

describe('Task List', () => {
    it('正常顯示', () => {
        const main = render(App)
        main.getByTestId('add')
        main.getByTestId('clear')
    })

    it('能增加新的事項', async () => {
        const todo = todoFactory()
        const main = render(App)

        // add task
        const addBtn = main.getByTestId('add')
        const todoContent = main.getByTestId('content')

        await fireEvent.update(todoContent, todo.content)
        await fireEvent.click(addBtn)

        expect(todoContent).toHaveValue('')
        main.getByText(todo.content)
        main.getByText(todo.time)
    })

    it('能清除完成的項目', async () => {
        const todo = todoFactory()
        const main = render(App)

        // add task
        const addBtn = main.getByTestId('add')
        const todoContent = main.getByTestId('content')

        await fireEvent.update(todoContent, todo.content)
        await fireEvent.click(addBtn)

        main.getByText(todo.content)
        main.getByText(todo.time)

        const clearBtn = main.getByTestId('clear')
        const clearElement = main.getByLabelText(todo.content)

        await fireEvent.click(clearElement)
        await fireEvent.click(clearBtn)

        expect(screen.queryByText(todo.time)).not.toBeInTheDocument()
    })
})
