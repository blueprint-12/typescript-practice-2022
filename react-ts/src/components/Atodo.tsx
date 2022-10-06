import classes from "./Atodo.module.css";

// 아래는 내가 만든 답, 근데 key를 todo리스트에서 사용한대서 그냥 todo.text 만 필요한 것
// props는 항상 객체이기 때문에 FC 안에 정의할 때는 {}를 사용

// const ATodo: React.FC<{ item: Todo }> = ({ item }) => {
//   return <li key={item.id}>{item.text}</li>;
// };

const ATodo: React.FC<{
  text: string;
  //인수의 타입을 지정하는건 선택사항이라 그냥 생략   (event: React.MouseEvent)
  onRemoveTodo: () => void;
}> = ({ text, onRemoveTodo }) => {
  return (
    <li className={classes.item} onClick={onRemoveTodo}>
      {text}
    </li>
  );
};

export default ATodo;
