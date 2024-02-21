'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const todos_js_1 = require("./models/todos.js");
exports.sequelize = new sequelize_1.Sequelize('Kanban', 'postgres', '30061995', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        ssl: false,
    }
});
exports.Todos = exports.sequelize.define('Todos', todos_js_1.todos, {
    tableName: 'todos',
    createdAt: false,
    updatedAt: false
});
//# sourceMappingURL=db.js.map