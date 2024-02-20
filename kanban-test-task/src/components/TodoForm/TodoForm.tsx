import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../../types/Todo';
import '../TodoItem/TodoItem.scss';

type Props = {
  todoToEdit?: Todo;
  onCancelEdit: () => void;
  onSaveTodo: (
    titleUpdated: string,
    descriptionUpdated: string,
    todoID: string
  ) => void;
};

const TodoForm: React.FC<Props> = ({
  todoToEdit,
  onSaveTodo,
  onCancelEdit,
}) => {
  const { title, description } = todoToEdit || {};

  const [editedTitle, setEditedTitle] = useState<string>(title || '');
  const [editedDescription, setEditedDescription] = useState<string>(
    description || ''
  );

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    onSaveTodo(editedTitle, editedDescription, todoToEdit?.id || '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveTodo(editedTitle, editedDescription, todoToEdit?.id || '');
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    onCancelEdit();
  };

  return (
    <form
      className={`box ${!todoToEdit ? 'todo-card__creating-new' : 'todo-card'}`}
      onSubmit={handleSubmit}
    >
      <div className='control'>
        <strong className='label'>
          {!todoToEdit ? 'Creating your new Todo' : 'Editing Todo'}
        </strong>
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
        placeholder='Enter new description for this Todo (optional)'
        value={editedDescription}
        onChange={(event) => setEditedDescription(event.target.value)}
      />
      <div className="icons-container">
        <button
          type='button'
          className='button button__save'
          onClick={handleSave}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
        <button
          type='button'
          className='button button__cancel'
          onClick={handleCancel}
        >
          <FontAwesomeIcon icon={faCancel} />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
