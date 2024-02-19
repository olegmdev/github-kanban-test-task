import { BoardType } from './BoardType';
import { Todo } from './Todo';

export type Board = {
  name: BoardType;
  todos: Todo[];
};