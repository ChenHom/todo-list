<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Todo } from '../types/Todo';
import Item from './Todo.vue'

const { date, todos } = defineProps<{ date: string, todos: Todo[] }>()
let isOpen = ref(true)
</script>

<template>
  <div class="cursor-pointer mt-8 p-2 bg-white border-b border-gray-300 text-gray-400 relative"
    @click="isOpen = !isOpen">
    {{ date }}
    <div role="button" class="-ml-2 border-2 border-gray-400 board bottom-3 right-2" :class="{ 'board-grow': !isOpen }">...</div>
  </div>
  <Transition name="slide-fade">
    <div v-show="isOpen">
      <TransitionGroup name="list" tag="ul">
        <Item v-for="todo in todos" :key="todo.index"
          :todo="{ ...todo }" :date="date" />
      </TransitionGroup>
    </div>
  </Transition>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
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
  transition: all 0.3s cubic-bezier(0, 0.8, 0.9, 1) 0.2s;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.board {
  width: 18px;
  height: 0px;
  position: absolute;
  transform: translateX(-50%);
  transition: height 0.5s ease-in, font-size 0.2s linear;
  text-align: center;
  font-size: 0;
}

.board-grow {
  transition: height 0.5s ease-out, font-size 0.4s linear 0.3s;
  height: 18px;
  font-size: 5px;
}
</style>