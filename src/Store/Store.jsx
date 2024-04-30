import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "../ToDoSlice";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});

// Optional: Add error handling for store configuration
store.subscribe(() => {
  const state = store.getState();
  if (state.todo === undefined) {
    console.error("Error: TodoReducer is not properly set up in the store.");
  }
});

export default store;
