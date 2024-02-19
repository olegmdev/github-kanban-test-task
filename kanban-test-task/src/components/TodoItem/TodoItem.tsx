import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';

import './TodoItem.scss';
import { Todo } from '../../types/Todo';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  onDelete: (todoID: string) => void;
  index: number;
  onSaveTodo: (
    titleUpdated: string,
    descriptionUpdated: string,
    todoID: string
  ) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  index,
  onSaveTodo,
}) => {
  const { title, description } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEditing(false);
    onSaveTodo(editedTitle, editedDescription, todo.id);
  };

  const handleDelete = (todoID: string) => {
    onDelete(todoID);
  };

  return (
    <Draggable
      draggableId={todo.id}
      index={index}
    >
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`box todo-card ${isEditing ? 'editing' : ''}`}
          >
            {isEditing ? (
              <form
                className='input-form'
              >
                <div className='control'>
                  <strong className='label'>Editing ToDo</strong>
                </div>
                <input
                  type='text'
                  className='input is-medium is-primary is-rounded has-icons-left'
                  placeholder='Title can not be empty'
                  value={editedTitle}
                  onChange={(event) => setEditedTitle(event.target.value)}
                  ref={titleField}
                />

                <textarea
                  className='textarea is-info has-fixed-size'
                  placeholder='Enter new description for this Todo'
                  value={editedDescription}
                  onChange={(event) => setEditedDescription(event.target.value)}
                />
                <button
                  type='button'
                  className='button button__save'
                  onClick={handleSave}
                >
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
              </form>
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
