<template>
  <div>
    <h1>To-Do List</h1>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Добавить задачу" />
    <ul>
      <li v-for="task in todoStore.tasks" :key="task.id">
        <input type="checkbox" v-model="task.completed" />
        <span :class="{ 'completed': task.completed }">{{ task.text }}</span>
        <button @click="deleteTask(task.id)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoStore } from './stores/todoStore';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTask = ref('');

    onMounted(() => {
      todoStore.loadTasks();
    });

    const addTask = () => {
      if (newTask.value.trim()) {
        todoStore.addTask(newTask.value);
        newTask.value = '';
      }
    };

    const deleteTask = (id: number) => {
      todoStore.deleteTask(id);
    };

    return { newTask, addTask, deleteTask, todoStore };
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:cornflowerblue;
  width: 600px;
  height: fit-content;
  margin: 0 auto;
}
ul{
  list-style-type: none;
  padding: 0;
}
span{
  font-size: 20px;
  margin-right: 20px;
}
button {
  display: inline-block;
  color: white;
  font-weight: 700;
  text-decoration: none;
  user-select: none;
  padding: .5em 2em;
  outline: none;
  border: 2px solid;
  border-radius: 1px;
  transition: 0.2s;
  cursor: pointer;
} 
button:hover { background: rgba(255,255,255,.2); }
button:active { background: white; }
</style>