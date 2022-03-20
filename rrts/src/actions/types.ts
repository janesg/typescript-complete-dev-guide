import { DeleteTodoAction, FetchTodosAction } from './todos';

// When no assignment in enum TS automatically 
// assigns the next integer in a sequence starting at zero
export enum ActionTypes {
    fetchTodos,
    deleteTodo
}

// Create a type union
export type Action = FetchTodosAction | DeleteTodoAction;