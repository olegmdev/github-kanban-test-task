import React, { Dispatch, SetStateAction } from 'react';

import './TodoList.scss';
import { TodoItem } from '../TodoItem/TodoItem';
import { BoardType } from '../../types/BoardType';
import { Todo } from '../../types/Todo';

type Props = {
  name: BoardType;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<Props> = ({ name, todos, setTodos }) => {
  const deleteTodo = (todoID: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== todoID));
    console.log(todoID);
  };

  const saveTodo = (titleUpdated: string, descriptionUpdated: string, todoID: string) => {
    if (!titleUpdated.length) {return}
    setTodos(prevTodos => {
    return prevTodos.map((todo) => {
      if (todo.id === todoID) {
        return {
          ...todo,
          title: titleUpdated,
          description: descriptionUpdated,
        };
      }
      return todo;
    });
  });
}

  return (
          <><h2 className='title is-3'>{name}:</h2><div className='todos-box'>
      {todos?.length ? (
        todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onDelete={deleteTodo}
            onSaveTodo={saveTodo} />
        ))
      ) : (
        <strong>No todos here yet</strong>
      )}
    </div></>
  );
};
