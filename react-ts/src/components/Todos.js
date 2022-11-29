var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Atodo_1 = __importDefault(require("./Atodo"));
const todos_context_1 = require("../store/todos-context");
const Todos_module_css_1 = __importDefault(require("./Todos.module.css"));
// 프롭스의 타입을 모두 명시적으로 적어두거나
//하면 번거로울 뿐만 아니라 children과 같은 리액트의 기능을
// 사용하지 못한다. 이럴 때 제네릭을 사용하면 된다.
// FC는 Functional Component, React.FC는 이미 Generic이다
const Todos = () => {
  // key 는 목록 즉, map 을 돌리는 이 컴포넌트에서 주어져야 한다고 함
  const todosCtx = (0, react_1.useContext)(todos_context_1.TodosContext);
  return (
    <ul className={Todos_module_css_1.default.todos}>
      {todosCtx.items.map((item) => (
        <Atodo_1.default
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};
exports.default = Todos;
