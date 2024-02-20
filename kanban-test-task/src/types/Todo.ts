import { BoardType } from './BoardType';

export type Todo = {
  id: string;
  index: number;
  title: string;
  description: string;
  status: BoardType;
}