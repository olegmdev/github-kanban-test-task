'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const createServer_js_1 = require("./createServer.js");
dotenv_1.default.config();
const PORT = process.env.PORT ?? 3001;
(0, createServer_js_1.createServer)().listen(PORT, () => {
    console.log(`Server is listening PORT ${PORT}`);
});
//# sourceMappingURL=main.js.map