<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { Priority, Todo } from '../types/Todo';
import Badge from './Badge.vue';

defineEmits<{ (e: 'sort', column: 'priority' | 'time'): void }>()
const { todo, date } = defineProps<{ todo: Todo, date: string }>()

let completed = ref(todo.completed)
let dateHover = ref(false)
let isHightPriority = todo.priority === Priority.QUICK

const toCompleted = inject('toCompleted') as { (date: string, index: number, complete: boolean): void }
const sort = inject('sortTodo') as { (column: 'priority' | 'time'): void }
watch(() => completed.value, (newValue) => toCompleted(date, todo.index, newValue))

</script>

<template>
    <div class="shadow-md mt-2 hover:shadow-inner" data-testid="card">
        <div class="pt-2 pb-5 bg-white space-y-3 border border-1 border-gray-100 hover:border-gray-200">
            <div class="flex items-start mt-2">
                <div class="max-h-10 w-36 text-left">
                    <span class="ml-2 mr-1 text-gray-300 text-xs cursor-default" @mouseover="dateHover = true"
                        @mouseleave="dateHover = false" @click="sort('time')" v-text="todo.time" />
                    <Transition name="slide">
                        <span class="text-gray-300 text-xs" v-show="dateHover" v-text="date" />
                    </Transition>
                </div>
                <div class="w-full flex justify-end pr-2">
                    <Badge class="opacity-70 cursor-default" @click="sort('priority')" :class="{
                        'bg-red-200': isHightPriority,
                        'text-red-500': isHightPriority,
                        'bg-sky-200': !isHightPriority,
                        'text-sky-500': !isHightPriority
                    }">{{ todo.priority }}
                    </Badge>
                </div>
            </div>
            <div class="flex items-start">
                <div class="max-h-10 my-auto w-16">
                    <input :id="`c_${todo.index}`" type="checkbox" v-model="completed"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                </div>
                <div class="w-full">
                    <p :for="`c_${todo.index}`"
                        class="mx-3 text-slate-500 text-ellipsis overflow-hidden text-xl text-left"
                        :class="{ 'line-through': completed }" @click="completed = !completed" v-text="todo.content">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.slide-enter-active {
    transition: all 0.2s ease-in;
}

.slide-leave-active {
    transition: all 0.5s ease-in
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>
