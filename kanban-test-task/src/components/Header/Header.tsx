import React, { useRef } from 'react';

import './Header.scss';

type Props = {
  handleID: (id: number) => void;
};

export const Header: React.FC<Props> = ({ handleID }) => {
  const titleField = useRef<HTMLInputElement>(null);


  const handleNew = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleField.current) {
      const id = parseInt(titleField.current.value);
      handleID(id);
  }
}

  return (
    <>
      <div className='container'>
        <h1 className='main-header'>Welcome to Kanban Board!</h1>
        <h2 className='secondary-header'>
          Enter your ID or create a new board
        </h2>
        <div className='header-container'>
          <form className='input-form' onSubmit={handleSubmit}>
            <input
              type='text'
              className='input is-large'
              placeholder='Enter ID'
              ref={titleField}
            />
            <div className="buttons-container">
              <button
                type='submit'
                className='button is-medium is-primary'
              >
                Search todos
              </button>
              <button
                type='submit'
                className='button is-medium is-info'
                onClick={handleNew}
              >
                Create new board
              </button>
            </div>
              </form>
        </div>
      </div>
    </>
  );
}