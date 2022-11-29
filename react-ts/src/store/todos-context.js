"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosContext = void 0;
const react_1 = __importStar(require("react"));
const todo_1 = __importDefault(require("../modules/todo"));
exports.TodosContext = react_1.default.createContext({
    items: [],
    addTodo: () => { },
    removeTodo: (id) => { },
});
const TodosContextProvider = (props) => {
    //useState를 사용할 때 제네릭을 지정하지 않으면 never 타입이 뜨는데
    // 이 의미는 초기값인 []안에 아무것도 들어올 수 없다는 것을 의미
    //그래서 우리는 이 배열에 어떤 데이터 타입이 들어가는 지 제네릭으로 알려주는 것이다.
    //state가 Todo 배열을 관리한다는 의미
    const [todos, setTodos] = (0, react_1.useState)([]);
    // NewTodo 컴포에 addTodoHandler 포인터를 전달
    const addTodoHandler = (newText) => {
        const newTodo = new todo_1.default(newText);
        setTodos((prevTodos) => {
            //concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다.
            //기존 배열 변경 X
            return prevTodos.concat(newTodo);
        });
    };
    const removeTodoHandler = (todoId) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== todoId);
        });
    };
    const contextValue = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    };
    return (<exports.TodosContext.Provider value={contextValue}>
      {props.children}
    </exports.TodosContext.Provider>);
};
exports.default = TodosContextProvider;
