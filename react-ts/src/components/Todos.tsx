import React, { useContext } from "react";

import ATodo from "./Atodo";

import { TodosContext } from "../store/todos-context";
import classes from "./Todos.module.css";
// 프롭스의 타입을 모두 명시적으로 적어두거나
//하면 번거로울 뿐만 아니라 children과 같은 리액트의 기능을
// 사용하지 못한다. 이럴 때 제네릭을 사용하면 된다.

// FC는 Functional Component, React.FC는 이미 Generic이다

const Todos: React.FC = () => {
  // key 는 목록 즉, map 을 돌리는 이 컴포넌트에서 주어져야 한다고 함
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <ATodo
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
