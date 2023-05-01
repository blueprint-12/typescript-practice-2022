// 함수의 타입을 설정해주는 방법

{
  // call signature를 만드는 가장 간단한 방법
  type Add = (a: number, b: number) => number;

  //객체처럼 만드는 방법도 있음 -> 이 방법을 사용하는 이유는 overloading때문이다.
  // 오버로딩은 함수가 서로 다른 call signatures를 가지고 있을 때 발생
  type Add2 = {
    (a: number, b: number): number;
    (a: number, b: string): number;
  };

  const add: Add = (a, b) => a + b;

  const add2: Add2 = (a, b) => {
    if (typeof b === "string") {
      return a;
    }
    return a + b; //만일 b가 number이면 a+b 를 리턴한다.
  };
  //위의 예시는 아주 안좋은 예시지만 이런 경우가 발생
}

// 실사용 예시: Router() 의 인자로 객체를 보내거나 string을 보내는 경우가 있는데 이럴 때 오버로딩을 활용해야 한다.

// 이 방법은 패키지나 라이브러리를 디자인할 때 많은 사람들이 사용한다.
{
  type Config = {
    path: string;
    state: object;
  };
  type Push = {
    (path: string): void;
    (config: Config): void;
  };

  const push: Push = (config) => {
    if (typeof config === "string") {
      console.log(config);
    } else {
      console.log(config.path);
    }
  };
}

// 파라미터만 다르고 같은 call signature일 때,
/* call signature들이 파라미터의 개수가 다른 경우, 마지막 파라미터는 
선택사항(optional) 로 취급한다. */

{
  type Add = {
    (a: number, b: number): number;
    (a: number, b: number, c: number): number;
  };

  //그렇기 때문에 아래와 같이 마지막 인자를 옵셔널이라고 명시해줘야 한다.
  const add: Add = (a, b, c?: number) => {
    if (c) return a + b + c;
    return a + b;
  };
  add(1, 2);
  add(1, 2, 3);
}

// 다형성 (polymorphism)

// ✅제네릭 사용: 제네릭이란 타입의 placeholder같은 것이다.
//사용 이유: call signature를 작성할 때, 인자로 들어온 값의 확실한 타입을 모를 때 사용한다.
{
  type SuperPrint = {
    // (arr: number[]): void;
    // (arr: string[]): void;
    // (arr: boolean[]): void;
    <T, V>(arr: T[], b: V): T;
  };

  type SuperNothing = <T>(a: T[]) => T;

  function superSomething<T>(a: T[]) {
    return a[0];
  }

  //위처럼 다양한 형태로 제네릭을 사용할 수 있다.

  const superPrint: SuperPrint = (arr) => {
    return arr[0];
  };

  const a = superPrint([1, 2, true, "string"], "");
  const b = superPrint([3, true], 3342);
}
