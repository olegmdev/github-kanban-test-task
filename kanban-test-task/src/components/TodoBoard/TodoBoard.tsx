import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


import './TodoBoard.scss';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from '../ToDoList/TodoList';
import { BoardType } from '../../types/BoardType';
import { Todo } from '../../types/Todo';

export const TodoBoard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    Array.from({ length: 4 }, (_, index) => ({
      id: uuidv4(),
      title: `Title#${index + 1}`,
      description: `Description#${
        index + 1
      } Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt`,
      status: BoardType.IN_PROGRESS,
    }))
  );

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return; 
    }

    const {source, destination} = result;

    const destinationColumn = destination.droppableId;

    const newTodos = [...todos];
    const [changedTodo] = newTodos.splice(source.index, 1);

    changedTodo.status = destinationColumn;

    newTodos.splice(result.destination.index, 0, changedTodo);

    console.log(newTodos);
    
    setTodos(newTodos);
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='main-container'>
        <Droppable droppableId={BoardType.TODO}>
          {(provided) => (
            <div
              className='todos-container__todo'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TodoList
                name={BoardType.TODO}
                todos={todos.filter((todo) => todo.status === BoardType.TODO)}
                setTodos={setTodos}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId={BoardType.IN_PROGRESS}>
          {(provided) => (
            <div
              className='todos-container__todo'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TodoList
                name={BoardType.IN_PROGRESS}
                todos={todos.filter(
                  (todo) => todo.status === BoardType.IN_PROGRESS
                )}
                setTodos={setTodos}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId={BoardType.DONE}>
          {(provided) => (
            <div
              className='todos-container__todo'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TodoList
                name={BoardType.DONE}
                todos={todos.filter((todo) => todo.status === BoardType.DONE)}
                setTodos={setTodos}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
