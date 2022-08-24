<script lang="ts" setup>
import { ref } from 'vue';
import { Todo } from '../types/Todo';
import Item from './Todo.vue'

const { date, todos } = defineProps<{ date: string, todos: Todo[] }>()
let isOpen = ref(true)
</script>

<template>
    <div class="mt-5 md:p-2 p-1 bg-white border-b border-gray-300 text-gray-400" @click="isOpen = !isOpen">
        {{ date }}
    </div>
    <Transition name="slide-fade">
        <div v-show="isOpen">
            <TransitionGroup name="fade" tag="ul">
                <Item v-for="todo in todos" :key="todo.index"
                    :todo="{ ...todo }" :date="date" />
            </TransitionGroup>
        </div>
    </Transition>
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
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>