"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todos_1 = __importDefault(require("./components/Todos"));
const NewTodo_1 = __importDefault(require("./components/NewTodo"));
const todos_context_1 = __importDefault(require("./store/todos-context"));
function App() {
    return (<todos_context_1.default>
      <NewTodo_1.default />
      <Todos_1.default />
    </todos_context_1.default>);
}
exports.default = App;
