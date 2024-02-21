"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_js_1 = require(".././controllers/todoController.js");
const router = express_1.default.Router();
router.get('/todos', todoController_js_1.getAllTodos);
router.get('/todos/:userID', todoController_js_1.getAllUserTodos);
router.post('/todos', todoController_js_1.createTodo);
router.delete('/todos/:todoID', todoController_js_1.removeTodo);
exports.default = router;
//# sourceMappingURL=routes.js.map