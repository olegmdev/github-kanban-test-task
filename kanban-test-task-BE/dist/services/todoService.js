"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodo = exports.createNewTodo = exports.findAllTodosFromUser = exports.findAllTodos = void 0;
const db_js_1 = require("../db.js");
const ToDoStatus_js_1 = require("../helpers/ToDoStatus.js");
const findAllTodos = async () => {
    const result = await db_js_1.Todos.findAll();
    return result;
};
exports.findAllTodos = findAllTodos;
const findAllTodosFromUser = async (userID) => {
    const userTodos = db_js_1.Todos.findAll({
        where: {
            userID: userID
        }
    });
    return userTodos;
};
exports.findAllTodosFromUser = findAllTodosFromUser;
const createNewTodo = async (title, description, userID, index) => {
    return await db_js_1.Todos.create({ title, description, userID, index, status: ToDoStatus_js_1.ToDoStatus.TODO });
};
exports.createNewTodo = createNewTodo;
const updateTodo = async (title, description, id) => {
    return await db_js_1.Todos.update({ title, description }, { where: { id } });
};
exports.updateTodo = updateTodo;
const deleteTodoById = async (todoId) => {
    return await db_js_1.Todos.destroy({
        where: {
            id: todoId
        }
    });
};
exports.deleteTodoById = deleteTodoById;
//# sourceMappingURL=todoService.js.map