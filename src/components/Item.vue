<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ (event: 'todoCompleted', todoIndex: string, isCompleted: boolean): void }>()
const { comment, datetime, complete, index } = defineProps<{ comment: string, datetime: string, complete: boolean, index: string }>()
let completed = ref(complete)

const [date, time] = datetime.split(' ')
let dateHover = ref(false)
let c = () => {
    emit('todoCompleted', index, !completed.value)
    completed.value = !completed.value
}
</script>

<template>
    <div class="shadow-md mt-5 hover:shadow-inner">
        <div class="px-6 pt-2 pb-5 bg-white space-y-3 border border-1 border-gray-100 hover:border-gray-200">
            <div class="text-left">
                <span class="ml-5 text-gray-300 text-xs" @mouseover="dateHover = true"
                    @mouseleave="dateHover = false">{{ date }}</span>
                <span class="ml-2 text-gray-300 text-xs" :class="{ 'hidden': !dateHover }">{{ time }}</span>
            </div>
            <div class="flex items-start">
                <div class="h-5">
                    <input :id="`comment${index}`" type="checkbox" :checked="completed" @change="c"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                </div>
                <div class="ml-3">
                    <label :for="`comment${index}`" class="text-gray-500 text-ellipsis overflow-hidden text-xl"
                        :class="{ 'line-through': completed }">{{ comment }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
