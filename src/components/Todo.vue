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
//  @click="completed = !completed"
</script>

<template>
    <div class="flex flex-row">
        <div class="w-full mt-2 shadow-inner hover:shadow-md" data-testid="card">
            <div class="pt-2 pb-5 bg-white space-y-3 border border-1 border-gray-100 hover:border-gray-200">
                <div class="flex items-start mt-2">
                    <div class="max-h-10 w-36 text-left">
                        <span class="ml-2 mr-1 text-gray-300 text-xs cursor-default" @click="sort('time')"
                            v-text="todo.time" />
                        <Transition name="slide">
                            <span class="text-gray-300 text-xs" v-show="dateHover" v-text="date" />
                        </Transition>
                    </div>
                    <div class="w-full flex justify-between pr-2">
                        <div class="text-xs">
                            <span
                                class="mx-1 cursor-pointer text-cyan-800 border-b-2 hover:border-blue-500 transition duration-150 ease-out"
                                v-for="(tag, key) in todo.tags" :key="key" v-text="tag"></span>
                        </div>
                        <Badge class="opacity-70 cursor-default" @click="sort('priority')" :class="{
                            'bg-red-200': isHightPriority,
                            'text-red-500': isHightPriority,
                            'bg-sky-200': !isHightPriority,
                            'text-sky-500': !isHightPriority
                        }">{{ todo.priority }}
                        </Badge>
                    </div>
                </div>
                <div class="flex items-start" @mouseover="dateHover = true" @mouseleave="dateHover = false">
                    <div class="max-h-10 my-auto w-16">
                        <input :id="`c_${todo.index}`" type="checkbox" v-model="completed"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                    </div>
                    <div class="w-full">
                        <p :for="`c_${todo.index}`"
                            class="mx-3 text-slate-500 text-ellipsis overflow-hidden text-xl text-left"
                            :class="{ 'line-through': completed }" v-text="todo.content">
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div>dd</div>
    </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.2s ease-in
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
}
</style>
