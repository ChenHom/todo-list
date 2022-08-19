import { describe, expect, it, test } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import App from './App.vue'

it('應該出現輸入框', async () => {
    const { getByPlaceholderText, getByText } = render(App)
    const input = getByPlaceholderText('...')
    const add = getByText('添加')

    await fireEvent.update(input, 'todo comment')
    await fireEvent.click(add)

    getByText('todo comment')
    expect(input).not.have.toEqual('')
})