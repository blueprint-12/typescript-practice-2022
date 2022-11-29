var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const Atodo_module_css_1 = __importDefault(require("./Atodo.module.css"));
// 아래는 내가 만든 답, 근데 key를 todo리스트에서 사용한대서 그냥 todo.text 만 필요한 것
// props는 항상 객체이기 때문에 FC 안에 정의할 때는 {}를 사용
// const ATodo: React.FC<{ item: Todo }> = ({ item }) => {
//   return <li key={item.id}>{item.text}</li>;
// };
const ATodo = ({ text, onRemoveTodo }) => {
  return (
    <li className={Atodo_module_css_1.default.item} onClick={onRemoveTodo}>
      {text}
    </li>
  );
};
exports.default = ATodo;
