// 유틸리티 타입스
// Required<T> 분석
// 옵셔널로 되어있는 프로퍼티 타입을 필수로 하고싶을 때

{
  interface Profile {
    name?: string;
    age?: number;
    married?: boolean;
  }

  type Name = Profile["name"];

  type R<T> = {
    //-? 의미: 옵셔널(?)을 빼라 라는 의미("-"의 명칭은 modifier ?)
    //T라는 인터페이스의 프로퍼티의 key를 가져올 때 optional은 빼고 가져오라는 의미

    [key in keyof T]-?: T[key];
  };

  //type Required<T> = { [P in keyof T]-?: T[P]; }
  // P = key

  // Readonly<T>
  //type Readonly<T> = {  readonly [P in keyof T]: T[P]; };
  //만약에 남의 타입을 가져올 때 readonly와 optional 을 둘 다 떼서 가져오고 싶다면
  // -readonly [key in keyof T]-? : T[key] 이런식으로 모디파이어("-")를 readonly 앞에도 붙여서 해당 속성을
  // 무효화시킬 수 있다.

  type MyReadonly<T> = {
    -readonly [key in keyof T]-?: T[key];
  };
  const cong: MyReadonly<Profile> = {
    name: "cong",
    age: 27,
    married: false,
  };

  cong.name = "hello world"; //프로퍼티를 수정한다고 하면
  // 수정을 막고싶을 떄 쓰는 유틸리티 타입이 Readonly <T>
}

//Record : 객체를 표현하는 방법 중 하나
{
  interface Obj {
    [key: string]: number;
  }
  const a: Obj = {
    a: 3,
    b: 5,
    c: 7,
  };

  //위에 것을 아래처럼 표현할 수 있다.
  //Record<K,T>
  //타입 T의 프로퍼티의 집합 K로 타입을 구성한다.
  //이 유틸리티는 타입의 프로퍼티들을 다른 타입에 매핑시키는데 사용될 수 있다.

  const b: Record<string, number> = { a: 3, b: 5, c: 7 };

  //Record<T> 직접 구현하기
  //객체의 키(T)는 string | number | symbol만 올 수 있기 때문에 제한해야한다.
  type R<T extends keyof any, S> = {
    [key in T]: S;
  };
}

{
  type A = string | null | undefined | boolean | number;
  //null과 undefined를 빼고 가져오고싶을 때
  type B = NonNullable<A>; //null과 undefined사라짐
  //이런 타입들이 key에 적용되는 게 있고 interface(객체)에 적용되는 게 있어서 구분할 줄 알아야 한다.
  //e.g.) Partial, Required, Readonly, Pick는 인터페이스에 적용되는데 반면, Exclude와 extract는 key에 적용되는 유틸리티 타입이다.
}
//NonNullable 구현
{
  type N<T> = T extends null | undefined ? never : T;
}

// infer 타입 분석
{
  function zip(
    x: number,
    y: string,
    z: boolean
  ): { x: number; y: string; z: boolean } {
    return { x, y, z };
  }
  //zip함수의 매개변수를 가져오고 싶은 상황
  //변수를 바로 Parameters의 제네릭으로 넘기면
  //'zip' refers to a value, but is being used as a type here. Did you mean 'typeof zip'?
  //에러 메세지가 나오는데 이때는 typeof 를 같이 써주면 된다.
  type Params = Parameters<typeof zip>; //Params는 튜플처럼 나온다.
  type First = Params[0]; // 결과가 배열처럼나오면 []로 프로퍼티에 접근가능

  //Parameters 직접 구현
  //함수의 매개변수의 타입을 가져와야 한다면 T에 들어갈 것이 함수여야 한다.
  //그렇다면 T를 함수로 제한해야 한다. T extends (...args: any) => any //함수 제한 방법
  //TIP : infer는 extends에서만 사용가능하다.
  //infer는 추론한다는 것인데
  //추론 조건? 추론 성공 시 값: 추론 실패 시의 값
  type P<T extends (...args: any) => any> = T extends (...args: infer A) => any
    ? A
    : never;

  // infer를 응용하여 함수의 return 값을 가져오는 것을 구현
  type R<T extends (...args: any) => any> = T extends (...args: any) => infer A
    ? A
    : never;

  type ReturnType = R<typeof zip>;

  //위에서 직접 구현한 P<T>, R<T>은 Parameters<T> , ReturnType<T> 로 이미 구현되어있는 유틸리티 타입이다.
}

// ConstructorParameters<T>
// InstanceType<T>  둘이 짝임

{
  class A {
    a: string;
    b: number;
    c: boolean;
    constructor(a: string, b: number, c: boolean) {
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }

  const c = new A("123", 456, true);
  //typeof 클래스가 생성자

  type C = ConstructorParameters<typeof A>; // 클래스의 생성자 매개변수를 알고싶을 때
  type I = InstanceType<typeof A>; // 클래스의 인스턴스 타입을 알고 싶을때

  //TIP: 클래스는 타입으로 바로 쓸 수 있음

  const a: A = new A("123", 345, true); // 클래스가 아니라 실제 객체로 만들어진 인스턴스(new키워드로 만들어진 애)
  // d.ts에서 "intrinsic"의미 => 타입으로 구현이 어려워 내부적으로 코드로 구현해놨다는 의미
  //혹은 구현부가 {} 로 비어있는 경우 위에 동일하게 내부적으로 구현해놨다는 뜻
}
