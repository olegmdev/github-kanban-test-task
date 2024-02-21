import express from 'express';
import { changeStatus, createTodo, getAllTodos, getAllUserTodos, removeTodo, updateOneTodo } from '.././controllers/todoController.js';
import { updateTodo } from '../services/todoService.js';

const router = express.Router();

router.get('/todos', getAllTodos);
router.get('/todos/:userID', getAllUserTodos);

router.post('/todos', createTodo);
router.delete('/todos/:todoID', removeTodo);

router.patch('/todos/:todoID', updateOneTodo);

router.patch('/todos/:todoID/:status', changeStatus);

export default router;
