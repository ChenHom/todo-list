<script setup lang="ts">
import { inject, ref } from 'vue';
import { Todo } from '../types/Todo';
import { pickLocalDateString } from '../utils/date'

const { todo, date } = defineProps<{ todo: Todo, date: string }>()

let completed = ref(todo.completed)
let dateHover = ref(false)

const toCompleted = inject('toCompleted') as { (date: string, index: number, complete: boolean): void }
</script>

<template>
    <div class="shadow-md mt-2 hover:shadow-inner" data-testid="card">
        <div class="px-6 pt-2 pb-5 bg-white space-y-3 border border-1 border-gray-100 hover:border-gray-200">
            <div class="text-left">
                <span class="ml-5 text-gray-300 text-xs" @mouseover="dateHover = true"
                    @mouseleave="dateHover = false">{{ todo.time }}</span>
                <Transition name="slide">
                    <span class="ml-2 text-gray-300 text-xs" v-show="dateHover">{{ pickLocalDateString(date) }}</span>
                </Transition>
            </div>
            <div class="flex items-start">
                <div class="h-5">
                    <input :id="`content${todo.index}`" type="checkbox" v-model="completed"
                        @change="toCompleted(date, todo.index, completed)"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                </div>
                <div class="ml-3">
                    <label :for="`content${todo.index}`" class="text-gray-500 text-ellipsis overflow-hidden text-xl"
                        :class="{ 'line-through': completed }">{{ todo.content }}
                    </label>
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
