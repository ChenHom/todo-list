<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue';
import { serializer } from './types/serializer';
import useTasks from './types/useTasks';
import Tasks from './components/Tasks.vue';
import { compare } from './utils/comparison';

const { tasks, addTodo, todoClearCompleted, todoCompleted } = useTasks()

let comment = ref('')

provide('toCompleted', todoCompleted)
const sortedTasks = computed(() => tasks.value.sort((t1, t2) => compare(t1.date, t2.date)))
watch(() => tasks.value, () => { serializer('serialize', tasks.value) }, { deep: true })

onMounted(() => {
  const saved = serializer('deserialize');
  if (saved) {
    tasks.value = saved
  }
})

function add(): void {
  if (comment.value) {
    addTodo(comment.value)
  }
  comment.value = ''
}
</script>

<template>
  <div class="shadow-md sm:overflow-hidden">
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6 border border-1 border-gray-100">
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3">
          <div class="mt-1 flex rounded-md shadow-sm">
            <button type="button" @click="todoClearCompleted" data-testid="clear"
              class="mr-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-md text-xs leading-4 font-medium text-gray-400 hover:bg-gray-50">清空已完成</button>
            <input type="text" id="todo" autofocus v-model="comment" @keypress.enter="add" data-testid="content"
              class="focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md shadow-md flex-1 block w-full sm:text-sm border-gray-300"
              placeholder="...">
            <button type="button" @click="add" data-testid="add"
              class="bg-white py-2 px-3 border border-l-0 border-gray-300 rounded-r-md shadow-md text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">添加</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Tasks v-for="task in sortedTasks" :date="task.date" :todos="task.todos" :key="task.date"></Tasks>
</template>
<style scoped>
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