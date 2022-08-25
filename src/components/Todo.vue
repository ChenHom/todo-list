<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { Todo } from '../types/Todo';
import { pickLocalDateString } from '../utils/date'

const { todo, date } = defineProps<{ todo: Todo, date: string }>()

let completed = ref(todo.completed)
let dateHover = ref(false)

const toCompleted = inject('toCompleted') as { (date: string, index: number, complete: boolean): void }
watch(() => completed.value, (newValue) => toCompleted(date, todo.index, newValue))
</script>

<template>
    <div class="shadow-md mt-2 hover:shadow-inner" data-testid="card">
        <div class="pt-2 pb-5 bg-white space-y-3 border border-1 border-gray-100 hover:border-gray-200">

            <div class="flex items-start">
                <div class="max-h-10 w-36 text-right">
                    <Transition name="slide">
                        <span class="text-gray-300 text-xs" v-show="dateHover" v-text="date" />
                    </Transition>
                    <span class="mx-1 text-gray-300 text-xs" @mouseover="dateHover = true"
                        @mouseleave="dateHover = false" v-text="todo.time" />
                </div>
                <div class="w-full"></div>
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
