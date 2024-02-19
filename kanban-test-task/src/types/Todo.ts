import { BoardType } from './BoardType';

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: BoardType;
}