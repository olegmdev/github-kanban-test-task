'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const routes_1 = __importDefault(require("./routes/routes"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    db_1.sequelize.authenticate().then(async () => {
        console.log('Connected!');
    }).catch((err) => {
        console.log(err);
    });
    app.use('/', routes_1.default);
    return app;
}
exports.createServer = createServer;
//# sourceMappingURL=createServer.js.map