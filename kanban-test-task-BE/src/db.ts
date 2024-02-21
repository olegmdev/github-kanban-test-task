'use strict';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { todos } from './models/todos.js';

export const sequelize = new Sequelize('Kanban', 'postgres', '30061995', {
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  }
});

export const Todos = sequelize.define('Todos', todos, {
  tableName: 'todos',
  createdAt: false,
  updatedAt: false
});

