"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todos = void 0;
const sequelize_1 = require("sequelize");
exports.todos = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    index: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    userID: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    }
};
//# sourceMappingURL=todos.js.map