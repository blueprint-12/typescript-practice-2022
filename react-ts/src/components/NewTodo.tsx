import { useRef, useContext } from "react";

import { TodosContext } from "../store/todos-context";

import classes from "./NewTodo.module.css";
//TS에서 function 타입을 정의하는 문법: (인자: 인자타입) => 리턴타입
const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  //TS에서 ref 로 연결하려면 어떤 HTML인터페이스인지 제네릭으로 표기해줘야 하며
  //기본값도 할당해줘야 한다.
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    //ref 를 사용할 때 ?. !. 은 다른 의미인데
    //TS 에서는 자동으로 ?. 를 붙여줌 해당 변수에 마우스를 대면
    //타입이 string | undefined 가 뜨는데 !. 를 하면 string만 뜸
    // 즉 !. 해당 ref 를 사용해서 값을 가져올 시점에 이 객체가 100퍼 값이 있다
    //라는 걸 확실할 때 사용하는 것이 좋다.
    let enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      //throw an error
      return;
    }

    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>투두 리스트 추가하기</button>
    </form>
  );
};

export default NewTodo;
