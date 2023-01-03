//😋Partial

interface Profile {
  name: string;
  age: number;
  married: boolean;
}
const cong: Profile = {
  name: "cong",
  age: 27,
  married: false,
};

//Partial<>의 기능: 프로퍼티들을 전부 "?" 옵셔널로 만들어 준다.(필수값이었던 것들을)
const noMarriedCong: Partial<Profile> = {
  name: "cong",
  age: 28,
};
//Partial을 직접 구현해보기
//맵드 타입스랑 인덱스드 시그니처 사용
type Name = "Human" | "Animal";
//keyof 뒤에는 interface가 올 수 있다. (type alias도 가능, js적으로는 객체 가능)
type P<T> = {
  //어떤 객체가 오든지 그 객체의 키들을 여기에 쓴다.
  //type Name = Profile['name'] 을 응용하여 아래와 같이 작성
  // Profile.name 은 접근 안됨 TS에서는 위의 방법 사용
  //여기서 T는 Profile이다.
  //이 프로퍼티들은 값이 있어도 되고 없어도 되기때문에 ? 로 옵셔널을 걸어준다.
  [key in keyof T]?: T[key];
};

//Pick 직접 구현하기
//제네릭들을 쓸 때에는 서로 간의 제한조건을 먼저 붙여줘야 한다.
//제네릭이 아무 값이나 되는 것이 아니라 제네릭 간의 규칙이 있기 때문이다.
//아래에서 Profile 과 "name" | "age" 의 관계가 T와 S의 관계라고 했을 때 둘의 관계를 먼저
//연결시켜주고 구현부(body)를 작성한다.
type MyPick<T, S extends keyof T> = {
  [key in S]: T[key];
};

//😋Pick (Profile에서 원하는 프로퍼티만 뽑아오는 유틸리티 타입)
const pickedCong: Pick<Profile, "name" | "age"> = {
  name: "cong",
  age: 28,
};

//😋Omit (Profile에서 원하지않는 프로퍼티를 명시해주면 그것만 제외시켜주는 유틸리티 타입 )
const omittedCong: Omit<Profile, "married"> = {
  age: 29,
  name: "cong",
};

//Omit은 바로 직접 만들 수 있는 게 아니라, Exclude와 Pick 이라는 유팉리티 타입에
//대해서 알고 있어야 한다.

//Exclude 는 T 타입에서 U를 빼는 것이다.
{
  /**
   * Exclude from T those types that are assignable to U
   */
  type Exclude<T, U> = T extends U ? never : T;
}
type A = Exclude<keyof Profile, "married">;

// 제한 조건 S extends keyof any -> S는 string | number | symbol
// lib.es5.d.ts 명시에 keyof T 는 알겠는데 keyof any는 무엇일까? 라는 것을 고민하면서 확인
// -> 틀려보면 에러메세지에 어떤 의도인지 알 수 있다.

// type Exclude<T, U> = T extends U ? never : T; -> never은 버린다는 의미: never은 쓰이지않으니까(T가 U의 부분집합이면?)
// type Extract<T, U> = T extends U ? T : never;
// 제네릭에서 extends 이면 3항 연산자를 쓸 수 있다.
// 아래 예시에서 T는 Animal 이고 U는 두번째 인자인 "Human" 이다.
type Animal = "Cat" | "Dog" | "Human";
type Mammal = Exclude<Animal, "Human">; // Mammal 은 Dog | Cat
type Human = Extract<Animal, "Human">; // Human 은 "Human" -> 즉, Exclude와 반대
