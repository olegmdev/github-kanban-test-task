import { Request, Response } from 'express';
import { createNewTodo, deleteTodoById, findAllTodos, findAllTodosFromUser, updateStatus, updateTodo } from '../services/todoService';
import { normalizeNumberID } from '../helpers/normalizeNumberID';
import { ToDoStatus } from '../helpers/ToDoStatus';

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await findAllTodos();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUserTodos =async (req: Request, res: Response) => {
  const { userID } = req.params;
  const normalizedUsedID = Number(userID);

  if(isNaN(normalizedUsedID) || normalizedUsedID < 1) {
    res.status(400).send('Uncorrect ID');
    return;
  }

  try {
    const todos = await findAllTodosFromUser(normalizedUsedID);
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
}

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, userID, index } = req.body;

    const normalizedTitle = title.trim();
    const normalizedUserID = normalizeNumberID(userID);
    const normalizedIndex = normalizeNumberID(index);

    if (!normalizedTitle.length ||normalizedUserID < 1 || normalizedIndex < 1 ) {
      return res.status(400).send("Incorrect input data!");
    }

    const newTodo = await createNewTodo(normalizedTitle, description, normalizedUserID, normalizedIndex);

    res.status(201).json(newTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error'});
    
  }
}

export const updateOneTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, id } = req.body;

    const normalizedTitle = title.trim();
  
    if (!normalizedTitle.length) {
      res.status(500).json({ error: 'Illegal input'});
    }

    const [updatedTodoCount] = await updateTodo(normalizedTitle, description, id);

    if (updatedTodoCount === 0) {
      res.status(404).send('Failed');
    } else {
      res.status(201).send('Success');
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error"});
  }
}

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.params;

    const normalizedStatus = status.trim();

    if (!(normalizedStatus in ToDoStatus)) {
      res.status(404).send('Failed');
      return;
    }

const [updatedTodoCount] = await updateStatus(status, id);

    if (updatedTodoCount === 0) {
      res.status(400).send('Failed, problem with status');
    } else {
      res.status(201).send('Success');
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error"});
  }
}

export const removeTodo = async (req: Request, res: Response) => {
  try {
    const { todoID } = req.params;

    await deleteTodoById(todoID);

    res.status(204).send('Deleted');
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to delete"});
    
  }
}
