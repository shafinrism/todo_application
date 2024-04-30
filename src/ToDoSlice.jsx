import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  sortCriteria: "All"
};

const ToDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setToDoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      const { task, id } = action.payload;
      state.todoList.push({
        task: task,
        id: id,
        completed: false,
      });
    },
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const todoToUpdate = state.todoList.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.task = task;
      }
    },
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const todoToUpdate = state.todoList.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.completed = !todoToUpdate.completed;
      }
    },
  },
});

export const {
  setToDoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} = ToDoSlice.actions;

export default ToDoSlice.reducer;
