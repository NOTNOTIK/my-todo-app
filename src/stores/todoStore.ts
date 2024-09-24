import { defineStore } from 'pinia';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    addTask(text: string) {
      const newTask: Task = { id: Date.now(), text, completed: false };
      this.tasks.push(newTask);
      this.saveTasks();
    },
    toggleTask(id: number) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks();
      }
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasks() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        this.tasks = JSON.parse(tasks);
      }
    }
  }
});