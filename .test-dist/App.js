"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
// App.tsx
const react_1 = require("@vercel/analytics/react");
const react_2 = require("@vercel/speed-insights/react");
const derivative_1 = __importDefault(require("./derivative"));
function App() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(derivative_1.default, {}), (0, jsx_runtime_1.jsx)(react_1.Analytics, {}), (0, jsx_runtime_1.jsx)(react_2.SpeedInsights, {})] }));
}
