const a: string = "5";
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = true; //any 타입은 js를 쓰는 것이랑 같다. ts의 주 목적은 any를 없애는 것
const g: 5 = 5; // 타입 자리에 아예 고정된 원시값을 넣을 수도 있다.e.g. boolean 대신 true
//함수에는 매개변수와 리턴에 타입을 명시해줘야 한다.
function add(x: number, y: number): number {
  return x + y;
}

//화살표 함수 타입 명시
{
  const add: (x: number, y: number) => number = (x, y) => x + y;
}
// type으로 타입을 선언하는 방식 타입 애일리어스 type alias
{
  type Add = (x: number, y: number) => number;
  const add: Add = (x, y) => x + y;
}
// 인터페이스를 통해서도 함수로 정의할 수 있다.
{
  interface Add {
    (x: number, y: number): number;
  }
  const add: Add = (x, y) => x + y;
}
// const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
{
  const arr: string[] = ["123", "456"];
  const arr2: number[] = [123, 456];
  //다른 배열 표기법(꺽쇄 -> 제네릭)
  const arr3: Array<number> = [123, 456];
}
// 튜플- 길이가 고정된 배열
{
  const arr: [number, number, string] = [123, 456, "789"];
}
{
  function add(x: number, y: number): number {
    return x + y;
  }
  const result = add(1, 2);
}
{
  //   function add(x: number, y: number): number;
  //   function add(x, y) {
  //     return x + y;
  //   }
}
// as 로 강제형변환
let aa = 123;
aa = "hello" as unknown as number;
{
  try {
    const array: string[] = [];
    // array[0];
    array.push("hello");
  } catch (error) {
    error;
  }
}

const head = document.querySelector("#head");
if (head) {
  head.innerHTML = "hello world";
}
{
  type Word = "world" | "hell";
  const a: Word = "world";

  const b = `hello ${a}`;
  type Greeting = `hello ${Word}`;
  const c: Greeting = "hello world";
}

{
  function rest(...args: string[]) {
    console.log(args);
  }

  function rest2(a: number, ...args: string[]) {
    console.log(a, args);
  }

  rest("1", "2", "3"); // ["1", "2", "3"]
  rest2(1, "1", "2", "3"); // 1,  ["1", "2", "3"]
}
{
  const tuple: [string, number] = ["str", 1];
  //tuple[2] = "hello"; //얘는 에러뜨는데
  tuple.push("hello"); //얘는 된다.(ts가 못막음)
  console.log(tuple); //["str", 1, "hello"]
}
{
  const enum EDirection {
    Up = 3,
    Down = 6,
    Left = 4,
    Right = 5,
  }
  const a = EDirection.Up;
  console.log(a); // 0

  // as const : type assertion의 한 종류로 리터럴 타입의 추론 범위를 줄이고
  //값의 재할당을 막기 위한 목적 -> 객체와 배열의 경우 const 로 선언되었다해도
  //내부의 프로퍼티는 보호받지 못하므로 as const 를 해주면 readonly로 변경되고 각 프로퍼티의
  //타입이 할당된 리터럴 값으로 추론된다(as const를 안할경우 number로 추론).
  const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
  } as const;

  const objectElemA = ODirection.Up;
  console.log(objectElemA); //0

  function walk(dir: EDirection) {}

  type Direction = typeof ODirection[keyof typeof ODirection];
  function run(dir: Direction) {}

  walk(EDirection.Left);
  run(ODirection.Down);
}
{
  const obj = { a: "123", b: "hello", c: "world" } as const;
  // 값을 타입으로 사용하고 싶을 떄, typeof를 쓴다.
  // 여기서 키들만 뽑아내고 싶다면 keyof로 해주면 된다.
  //객체의 key들만 뽑아내고 싶다.
  type Key = keyof typeof obj;

  //객체의 value들만 뽑아내고 싶다.
  type Value = typeof obj[keyof typeof obj];
}
{
  type A = { a: string };
  const a: A = { a: "hello" };

  interface B {
    a: string;
  }
  const b: B = { a: "hello" };
}
{
  //   function add(x: string | number, y: string | number): string | number {
  //     return x + y;
  //   }
  const result: string | number = add(1, 2); //결과가 숫자인데 추론은 string | number 으로 하고있다.
  // result.charAt(); 유니언을 남발하면 뒤에 로직이 다 꼬인다.
}
{
  //&(intersection) 의미: AND와 같음 둘 다 만족
  type A = string & number; //원시값
  // const a: A = 1; 에러

  //주의점: const b는 type O가 &(and)가 아니라 | (or)일때도 만족되어 사용할 수 있다.
  // & - 모든 속성이 다 있어야 한다.
  // | - 여러 개 중에 하나만 있어도 된다.

  //참조값 시 intersection
  type O = { hello: "world" } & { zero: "cho" };
  const b: O = { hello: "world", zero: "cho" };
}

{
  // 타입을 &과 사용하여 상속처럼 사용 가능
  type Animal = { breath: true };
  type Poyouryu = Animal & { breed: true };
  type Human = Poyouryu & { think: true };

  const cong: Human = { breath: true, breed: true, think: true };

  interface A {
    think: true;
  }
  interface B extends A {
    breed: true;
  }
  const b: B = {
    breed: true,
    think: true,
  };
}

{
  //인터페이스 특징: 확장성, 중복 선언 가능(동일한 인터페이스에 프로퍼티가 추가된다.)
  interface A {
    talk: () => void;
  }
  interface A {
    sleep: () => void;
  }
  interface A {
    love: () => void;
  }
  interface A {
    eat: () => void;
  }
  const a: A = { talk() {}, eat() {}, love() {}, sleep() {} };
}

{
  //좁은 타입과 넓은 타입
  //좁은 타입을 넓은 타입에 넣는 것(대입)은 가능
  //하지만, 넓은 타입을 좁은 타입에는 X 집합을 예시로 생각하면 된다.
  // ->직관적으로 헷갈리는 타입을 그냥 다른 타입으로 넣어봤을 때,
  // 오류가 안뜬다면 좁은 타입인거고 오류가 뜬다면 넓은 타입을 좁은 타입에 넣은 것.
  type A = string | number;
  type B = string;

  type C = string & number;

  //객체는 상세적(구체적)일수록 좁은 범위라고 생각하면 된다.
  type ObjA = { name: string };
  type ObjB = { age: number };
  type ObjAB = ObjA | ObjB;
  type ObjC = ObjA & ObjB;
  const ab: ObjAB = {
    age: 28,
  };

  //예외적인 case, 타입이 넓냐 좁냐 검사 외에도 '잉여속성 검사'를 하는데
  //객체 리터럴일 때 바로 집어넣어서 타입 사이즈 체크를 하면 헷갈릴 수 있다.
  //(좁은 타입을 넓은 타입에 넣은 건데 왜 안되지? 싶은 순간)
  //이럴 때는 중간에 다른 객체로 빼주기만 해도 에러가 사라진다.
  const objC: ObjC = {
    age: 28,
    name: "cong",
    // married: false, 여기서 객체 리터럴이라 바로 에러가 난다.(컨텐츠를 그대로 대입하는 방법)
  };
  //obj라는 객체로 따로 빼주어 대입하면 에러가 뜨지 않는다.
  const obj = { name: "cong", age: 28, married: true };
  const objC1: ObjC = obj;
}
{
  //void 타입
  //따로 빠져있는 함수의 void + 매개변수로 선언된 함수(콜백)의 void
  function a(callback: () => void): void {
    return;
  }

  //메서드로서의 void
  interface Human {
    talk: () => void;
  }
  const human: Human = {
    talk() {
      return 123;
    },
  };
}

//이전에 함수도 body(구현부)없이 선언할 수 있다고 했는데
//대신 구현부와 선언부를 나눠놓은 것이기 떄문에 바로 밑에 구현부를 써줘야 한다.
declare function forEach(arr: number[], callback: (el: number) => void): void;
//구현부를 만들 기 싫을때는 선언부 앞에 declare를 붙여주면 된다.-> 실제 JS파일에서는 사라진다.
let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el));

{
  interface A {
    talk: () => void;
  }
  const a: A = {
    talk() {
      return 3;
    },
  };
  //any는 타입선언을 포기해버리는 것
  //unknown은 "지금 당장은 타입을 정확히 모를 때" 사용하는 것, 직접 쓸 때 타입을 as로 정의해주면 된다.
  const b: unknown = a.talk();
  (b as A).talk();
}
{
  try {
  } catch (error) {
    //대표적으로 error의 타입은 unknown이다.
    //Error는 TS에서 제공하는 기본 error타입, Axios error의 경우 AxiosError로 명시해줘야 한다.
    (error as Error).message;
  }
}
{
  interface A {
    talk: () => void;
  }

  const a: A = {
    talk() {
      return 3;
    },
  };
  const b = a.talk() as unknown as number; //talk가 void로 잘못선언되어있기 때문에 강제형변환해야함
  b.toString(); //만약에 위에 as unknown as number가 없어서 TS문법 오류가 나도 js 로 컴파일이 안되는 것은 아님
}

{
  function a(): void {
    return undefined;
  }
}
