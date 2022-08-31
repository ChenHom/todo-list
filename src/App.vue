<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue';
import { serializer } from './types/serializer';
import useTasks from './types/useTasks';
import Tasks from './components/Tasks.vue';
import { sort } from './utils/comparison';
import { Priority } from './types/Todo';

const { tasks, addTodo, todoClearCompleted, todoCompleted } = useTasks()

let comment = ref('')
let priority = ref(Priority.NORMAL)

provide('toCompleted', todoCompleted)
const sortedTasks = computed(() => tasks.value.sort((t1, t2) => sort(t2.date, t1.date)))
watch(() => tasks.value, () => { serializer('serialize', tasks.value) }, { deep: true })

onMounted(() => {
  const saved = serializer('deserialize');
  if (saved) {
    tasks.value = saved
  }
})

function add(): void {
  if (comment.value) {
    addTodo(comment.value, priority.value)
  }

  reset()
}

function reset() {
  comment.value = ''
  priority.value = Priority.NORMAL
}
</script>

<template>
  <div class="shadow-md sm:overflow-hidden">
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6 border border-1 border-gray-100">
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3">
          <div class="mt-1 flex rounded-md shadow-sm">
            <button type="button" @click="todoClearCompleted" data-testid="clear"
              class="mr-5 bg-blue-50 py-2 px-3 border border-gray-300 rounded-md shadow-md text-xs leading-4 font-medium text-gray-400 hover:bg-gray-50 hover:shadow-inner">清空已完成</button>
            <input type="text" id="todo" autofocus v-model="comment" @keypress.enter="add" data-testid="content"
              class=" focus:border-sky-300 rounded-l-md shadow-md flex-1 block w-full sm:text-sm border-gray-300 hover:shadow-inner placeholder-gray-300"
              placeholder="do it...">
            <div class="w-16 relative bg-red-200 flex">
              <input type="radio" class="priority-button opacity-0" v-model="priority" @keypress.enter="add"
                :value="Priority.QUICK" name="radio" id="quick-priority">
              <div class="priority-tile quick-priority">
                <label for="quick-priority" class="priority-label text-red-500">急事</label>
              </div>
            </div>
            <div class="w-16 relative bg-sky-200 flex">
              <input type="radio" class="priority-button" name="radio" v-model="priority" @keypress.enter="add"
                :value="Priority.NORMAL" id="slow-priority">
              <div class="priority-tile slow-priority">
                <label for="slow-priority" class="priority-label text-sky-500">緩辦</label>
              </div>
            </div>
            <button type="button" @click="add" data-testid="add"
              class="bg-blue-100 py-2 px-3 border border-l-0 border-blue-300 rounded-r-md shadow-md text-sm leading-4 font-semibold text-gray-500 hover:bg-blue-200 hover:shadow-inner">添加</button>
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

.priority-tile {
  @apply border border-y border-gray-300 shadow-md text-sm flex place-content-center flex-grow;
  height: inherit;
  transition: font-size 500ms ease;
}

.priority-button {
  @apply absolute top-0 left-0 w-full h-full opacity-0;
}

.priority-label {
  @apply place-self-center;
}

.priority-button:checked+.priority-tile {
  @apply border-2 text-xl;
}

.priority-button:checked+.priority-tile.quick-priority {
  @apply border-red-500 border-opacity-30;
}

.priority-button:checked+.priority-tile.slow-priority {
  @apply border-sky-500 border-opacity-30;
}
</style>