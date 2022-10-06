//만들어진 클래스는 객체를 생성하는 역할만 하는 것이 아니라
//타입처럼 사용할 수 있다.
//이 데이터는 todo.ts (not .tsx확장자)로 정의되어 있고
//소문자로 시작하지만 class 를 정의해주는 것이기 때문에 대문자 Todo 로 시작하는 것
//JSX를 사용하는 컴포넌트와 구분하기 위해 소문자로 작성되었음

class Todo {
  //타입스크립트에서는 미리 프로퍼티를 정의하고 타입도 지정해줘야한다.
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

export default Todo;
