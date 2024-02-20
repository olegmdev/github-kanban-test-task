import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import './TodoItem.scss';
import { Todo } from '../../types/Todo';
import { Draggable } from 'react-beautiful-dnd';
import TodoForm from '../TodoForm/TodoForm';

type Props = {
  todo: Todo;
  onDelete: (todoID: string) => void;
  onSaveTodo: (
    titleUpdated: string,
    descriptionUpdated: string,
    todoID: string
  ) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onSaveTodo,
}) => {
  const { title, description } = todo;

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleSaveTodo = (title: string, description: string, todoID: string) => {
    onSaveTodo(title, description, todoID);
    setIsEditing(false);
  }


  const handleDelete = (todoID: string) => {
    onDelete(todoID);
  };

  const handleCancel = () => {
    setIsEditing(false);
  }

  return (
    <Draggable
      draggableId={todo.id}
      index={todo.index}
      isDragDisabled={isEditing}
    >
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`box todo-card `}
          >
            {isEditing ? (
              <TodoForm
                todoToEdit={todo}
                onSaveTodo={handleSaveTodo}
                onCancelEdit={handleCancel}
              />
            ) : (
              <>
                <strong>{title}</strong>
                <p>{description}</p>

                <div className='icons-container'>
                  <button
                    type='button'
                    className='button button-edit'
                    onClick={handleEdit}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    type='submit'
                    className='button button-delete'
                    onClick={() => handleDelete(todo.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};
