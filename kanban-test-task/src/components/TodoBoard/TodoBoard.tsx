import React, { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import './TodoBoard.scss';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from '../ToDoList/TodoList';
import { BoardType } from '../../types/BoardType';
import { Todo } from '../../types/Todo';
import TodoForm from '../TodoForm/TodoForm';
import { getIndex } from '../../helpers/getNewIndex';

type Props = {
  userID: number;
};

export const TodoBoard: React.FC<Props> = ({ userID }) => {

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      index: 1,
      title: 'Сходить в магазин',
      description: 'Купить продукты и молоко',
      status: BoardType.TODO,
    },
    {
      id: '2',
      index: 2,
      title: 'Прочитать книгу',
      description: 'Закончить последнюю главу',
      status: BoardType.TODO,
    },
    {
      id: '3',
      index: 3,
      title: 'Написать письмо',
      description: 'Отправить письмо другу',
      status: BoardType.TODO,
    },
    {
      id: '4',
      index: 4,
      title: 'Заняться спортом',
      description: 'Пойти на тренировку в зал',
      status: BoardType.TODO,
    },
    {
      id: '5',
      index: 5,
      title: 'Подготовить презентацию',
      description: 'Подготовить материалы для совещания',
      status: BoardType.TODO,
    },
  ]);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handlePressCreate = () => {
    setIsCreating(true);
  };

  const handleAddTodo = (title: string, description: string) => {
    if (!title.length) {
      setIsCreating(false);
      return;
    }


    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      status: BoardType.TODO,
      index: getIndex(todos),
    };

    const newTodos = [newTodo, ...todos];

    setTodos(newTodos);
    setIsCreating(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

    const handleCancel = () => {
      setIsCreating(false);
    };

const handleDragEnd = (result: DropResult) => {
  if (!result.destination) {
    return;
  }

  const { destination } = result;

  const destinationColumn = destination.droppableId;

  const movedTodoId = result.draggableId;

  const movedTodo = todos.find((todo) => todo.id === movedTodoId);

  if (!movedTodo) {
    return;
  }

  const newTodos = [...todos];

  const sourceTodos = newTodos.filter((todo) => todo.id !== movedTodoId);

  const destinationIndex = destination.index;
  sourceTodos.splice(destinationIndex, 0, movedTodo);

  movedTodo.status = destinationColumn as BoardType;

  sourceTodos.forEach((todo, index) => {
    todo.index = index + 1;
  });

  setTodos(sourceTodos);
};


  return (
    <><h2>User ID is : {userID}</h2><DragDropContext onDragEnd={handleDragEnd}>
      <div className='wrap-container'>
        {!isCreating && (
          <form onSubmit={handleSubmit}>
            <button
              type='button'
              className='button is-primary is-rounded is-large'
              onClick={handlePressCreate}
            >
              Click to create Todo
            </button>
          </form>
        )}
        {isCreating && (
          <TodoForm
            onSaveTodo={handleAddTodo}
            onCancelEdit={handleCancel} />
        )}

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
                  setTodos={setTodos} />
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
                  setTodos={setTodos} />
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
                  setTodos={setTodos} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext></>
  );
};
