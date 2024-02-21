import { Todos } from '../db.js';
import { ToDoStatus } from '../helpers/ToDoStatus.js';

export const findAllTodos =async () => {
  const result = await Todos.findAll();

  return result;
}

export const findAllTodosFromUser = async (userID: number) => {
  const userTodos = Todos.findAll({
    where: {
      userID: userID
    }
  });

  return userTodos;
}

export const createNewTodo = async (title: string, description: string, userID: number, index: number) => {

  return await Todos.create({ title, description, userID, index, status: ToDoStatus.TODO});
}

export const updateTodo = async (title: string, description: string, id: string) => {
  return await Todos.update( { title, description }, { where: { id }});
}

export const updateStatus = async (status: string, id: string) => {
  return await Todos.update( { status }, { where :{ id }});
}

export const deleteTodoById = async (todoId: string) => {
  return await Todos.destroy({
    where: {
      id: todoId
    }
  });
}