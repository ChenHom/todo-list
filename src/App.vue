<script setup lang="ts">
import { ref, watch } from 'vue';
import Item from './components/Item.vue';

let todoList = ref<Todo[]>(JSON.parse(localStorage.getItem('todoList') || '[]'))
let comment = ref('')


watch(() => todoList.value, () => localStorage.setItem('todoList', JSON.stringify(todoList.value)), { deep: true })

function completed(todoIndex: string, isCompleted: boolean) {
  console.log(todoIndex, isCompleted)
  let index = todoList.value.findIndex(item => item.index === todoIndex)
  todoList.value[index].completed = isCompleted
}

function pushTodo(comment: string, completed: boolean = false): void {
  todoList.value.push({
    context: {
      comment: comment,
      datetime: new Date().toLocaleString('zh-TW', { hour12: false })
    },
    index: `${Math.random().toString(32).substring(2, 5)}_${comment.substring(0, 5)}`,
    completed: completed
  })
}

function add(): void {
  if (comment.value) {
    pushTodo(comment.value)
    comment.value = ''
  }
}

function clear(): void {
  todoList.value = todoList.value.filter(item => !item.completed)
}
</script>

<template>
  <div class="shadow-md sm:overflow-hidden">
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6 border border-1 border-gray-100">
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3">
          <div class="mt-1 flex rounded-md shadow-sm">
            <button type="button" @click="clear"
              class="mr-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-md text-xs leading-4 font-medium text-gray-400 hover:bg-gray-50">清空已完成</button>
            <input type="text" id="todo" v-model="comment" @keypress.enter="add"
              class="focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md shadow-md flex-1 block w-full sm:text-sm border-gray-300"
              placeholder="...">
            <button type="button" @click="add"
              class="bg-white py-2 px-3 border border-l-0 border-gray-300 rounded-r-md shadow-md text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">添加</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TransitionGroup name="fade" tag="ul">
    <Item v-for="todo in todoList" :key="todo.index"
      :comment="todo.context.comment"
      :datetime="todo.context.datetime"
      :complete="todo.completed"
      :index="todo.index"
      @todo-completed="completed" />
  </TransitionGroup>
</template>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>