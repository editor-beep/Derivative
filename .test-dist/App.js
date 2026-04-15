"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
// App.tsx
const derivative_1 = __importDefault(require("./derivative"));
function App() {
    return (0, jsx_runtime_1.jsx)(derivative_1.default, {});
}
