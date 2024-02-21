"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateOneTodo = exports.createTodo = exports.getAllUserTodos = exports.getAllTodos = void 0;
const todoService_1 = require("../services/todoService");
const normalizeNumberID_1 = require("../helpers/normalizeNumberID");
const getAllTodos = async (req, res) => {
    try {
        const todos = await (0, todoService_1.findAllTodos)();
        res.json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllTodos = getAllTodos;
const getAllUserTodos = async (req, res) => {
    const { userID } = req.params;
    const normalizedUsedID = Number(userID);
    if (isNaN(normalizedUsedID) || normalizedUsedID < 1) {
        res.status(400).send('Uncorrect ID');
        return;
    }
    try {
        const todos = await (0, todoService_1.findAllTodosFromUser)(normalizedUsedID);
        res.json(todos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllUserTodos = getAllUserTodos;
const createTodo = async (req, res) => {
    try {
        const { title, description, userID, index } = req.body;
        const normalizedTitle = title.trim();
        const normalizedUserID = (0, normalizeNumberID_1.normalizeNumberID)(userID);
        const normalizedIndex = (0, normalizeNumberID_1.normalizeNumberID)(index);
        if (!normalizedTitle.length || normalizedUserID < 1 || normalizedIndex < 1) {
            return res.status(400).send("Incorrect input data!");
        }
        const newTodo = await (0, todoService_1.createNewTodo)(normalizedTitle, description, normalizedUserID, normalizedIndex);
        res.status(201).json(newTodo);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
exports.createTodo = createTodo;
const updateOneTodo = async (req, res) => {
    try {
        const { title, description, id } = req.body;
        const normalizedTitle = title.trim();
        if (!normalizedTitle.length) {
            res.status(500).json({ error: 'Illegal input' });
        }
        const [updatedTodoCount] = await (0, todoService_1.updateTodo)(normalizedTitle, description, id);
        if (updatedTodoCount === 0) {
            res.status(404).send('Failed');
        }
        else {
            res.status(201).send('Success');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
};
exports.updateOneTodo = updateOneTodo;
const removeTodo = async (req, res) => {
    try {
        const { todoID } = req.params;
        await (0, todoService_1.deleteTodoById)(todoID);
        res.status(204).send('Deleted');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Unable to delete" });
    }
};
exports.removeTodo = removeTodo;
//# sourceMappingURL=todoController.js.map