import { Todo } from '../types/Todo';

export const getIndex = (todos: Todo[]) => {
      if (!todos.length) {
        return 1;
      }

      return Math.max(...todos.map((todo) => todo.index)) + 1;
    };