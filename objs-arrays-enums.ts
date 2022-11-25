{
  //TS 객체표기
  //Any Javascript object, more specific types (type of object) are possible
  //아래는 명시적인 객체 타입 표기 (암시적으로 알 수 있어서 생략해도 된다.)
  const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
  } = {
    name: "Alex",
    age: 30,
    hobbies: ["축구", "요리"],
    role: [2, "author"],
  };

  //   person.role.push("admin");
  // 튜플은 배열의 길이를 제한한다했지만 push로 요소를 추가하는 것은 막히지않는다.
  //   person.role[1] = 10;
  console.log(person.role.length);

  let favoriteActivities: string[];
  favoriteActivities = ["농구"];

  console.log(person.age);
  for (const hobby of person.hobbies) {
    console.log(hobby); // 축구 요리
  }
  // Array
  // : Any JavaScript array, type can be flexible or strict(regarding the element types)

  //Tuple e.g) [1,2]
  // :Added by TypeScript: Fixed-length array
}

{
  //✅Enum : typescript에 의해 추가된 유형이며 JS에는 없음
  //Added by Typescript : Automatically enumerated global constant identifier
  //예시: enum {NEW, OLD}

  //기존 방법, 식별자에 num이나 string을 부여
  // const ADMIN = 0;
  // const READ_ONLY = 1;
  // const AUTHOR = 2;
  //Enum 컨벤션 첫시작 대문자(Enum은 커스텀 타입이라서)
  //클래스, 객체와 비슷하게 생겼음
  // 주로 enum의 요소들도 all 대문자로 쓰지만 무조건 그래야 하는 것은 아니고, Any value 네이밍해도 무관
  //배열처럼 숫자를 값으로 할당, 0부터 시작하지 않게 하려면 요소에 "= number"해주면된다.
  // 할당값은 숫자, string, 혼합으로 넣어도 된다.
  // -> 즉, enum은 매핑된 idenifier가 필요할 때 좋다.
  enum Role {
    ADMIN = 7,
    READ_ONLY = "READ_ONLY",
    AUTHOR = 200,
  }

  const person = {
    name: "Alex",
    age: 30,
    hobbies: ["축구", "요리"],
    role: Role.ADMIN,
  };

  if (person.role === Role.ADMIN) {
    console.log("is admin");
  }
}

//Core Types 정리
{
  /*
 number :number
 string :string
 boolean :boolean
 object :{} 명시적으로 안써도 된다. 
 Array: 얘도 명시적으로 안써도 되지만 string[]
 Tuple : [number, string] 길이 제한이 있는 배열, 요소별 타입을 지정하고 싶을 때 사용
 Enum const Person{ 요소=지정값, }; //이넘명은 대문자 시작, 요소명은 전부 대문자 관례
 Any -> 타입스크립트 컴파일러가 어떤 에러도 발견할 수 없음, 즉 TS장점이없어짐
 하지만 정말 어떤 value가 올 지 모르겠는 값에 any 타입을 지정
 혹은 런타임에 범위를 좁혀서 검사하고 싶은 데이터에 any 타입 적용
 */
}
