import {
  TOGGLE_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  FILTER_TODOS,
  MARK_ALL_COMPLETED,
  UPDATE_SEARCH_TERM,
  LOGIN,
} from "./actionTypes";
export const login = (isLoggedIn: boolean) => ({
  type: LOGIN,
  payload: { isLoggedIn },
});
export const toggleTodo = (id: string) => ({
  type: TOGGLE_TODO,
  payload: { id },
});
export const removeTodo = (id: string) => ({
  type: REMOVE_TODO,
  payload: { id },
});
export const markCompleted = (id: string) => ({
  type: MARK_COMPLETED,
  payload: { id },
});
export const markIncomplete = (id: string) => ({
  type: MARK_INCOMPLETE,
  payload: { id },
});
export const filterTodos = (filter: string) => ({
  type: FILTER_TODOS,
  payload: { filter },
});
export const markAllCompleted = () => ({
  type: MARK_ALL_COMPLETED,
});
export const updateSearchTerm = (searchTerm: string) => ({
  type: UPDATE_SEARCH_TERM,
  payload: { searchTerm },
});
