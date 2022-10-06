import React, { useState } from "react";
import Todo from "../modules/todo";

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  //useState를 사용할 때 제네릭을 지정하지 않으면 never 타입이 뜨는데
  // 이 의미는 초기값인 []안에 아무것도 들어올 수 없다는 것을 의미
  //그래서 우리는 이 배열에 어떤 데이터 타입이 들어가는 지 제네릭으로 알려주는 것이다.

  //state가 Todo 배열을 관리한다는 의미
  const [todos, setTodos] = useState<Todo[]>([]);

  // NewTodo 컴포에 addTodoHandler 포인터를 전달
  const addTodoHandler = (newText: string) => {
    const newTodo = new Todo(newText);

    setTodos((prevTodos) => {
      //concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다.
      //기존 배열 변경 X
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };
  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
