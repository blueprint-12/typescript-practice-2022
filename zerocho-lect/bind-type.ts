// bind type에 대해서 분석
{
  //lib.es5.d.ts bind
  // 바인드 오버로딩 많다..
  //bind는 크게 this를 쓰는 경우와 안 쓰는 경우 두 가지로 나뉜다.
  /*
    bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
    bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
    bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
    bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
    bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
    bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R;

    //ThisParameterType
    //T는 함수 타입, this 추론이 실패하면 unknown
    type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;


    //OmitThisParameter
    //위에서 ThisParameterType이 unknown일 때(즉, 타입 추론이 실패한 상황), 그 함수 타입 그대로 가고 타입 추론이 성공하면 매개변수 A와 리턴값 R을 알아내서 그것을 사용하는 함수를 만들어라  
    //코드를 보면 this가 없다. 즉 OmitThisParameter 의 두 경우는 모두 this가 존재하지 않음 -> OmitThisParameter은 함수에서 this를 없애는 타입
    type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
    */
}
{
  function a(this: Window | typeof obj, param: string) {
    console.log(this.name);
    console.log(param);
  }

  const obj = { name: "cong" };
  const b = a.bind(obj);
  b("something"); //cong

  type T = ThisParameterType<typeof a>;
  type NoThis = OmitThisParameter<typeof a>; //param: string 만 NoThis 타입에 담긴다.
}
{
  //bind w this vs bind w noThis 예시
  const cong = {
    name: "cong",
    //this를 매개변수에 직접 명시해도 됨(굳이 안써줘도 되지만 만약에 쓰고싶다면)
    sayHello(this: { name: string }) {
      console.log(`hi ${this.name}`);
    },
  };
  const sayHello = cong.sayHello;
  // 아래 코드는 흔히 bind를 통해 this를 변경해주는 것
  const sayHi = cong.sayHello.bind({ name: "kara" });
  sayHi();

  //noThis example
  function add(a: number, b: number, c: number, d: number, f: number) {
    return a + b + c + d + f;
  }

  //null이 this자리, 그 뒤에 숫자가 차례대로 a자리(매개변수 자리의 인수를 고정시켜놓을 수 있음)
  //즉, bind를 통해서 매개변수를 바인드한 것

  //type분석 시, this 가 어려우면 this 자리를 지우고 자리를 매칭해본다.
  //TS에서 매개변수가 5개이상일 때에는 만들어놓지 않았다.(1,2,3,4 자리)
  //그 이상은 하나로 퉁쳐서 구현해놓았기 때문에 TS문법적 한계-> 타입지원이 완벽하지 않다.
  const add1 = add.bind(null);
  add1(1, 2, 3, 4, 5);
  const add2 = add.bind(null, 1);
  add2(2, 3, 4, 5);
  const add3 = add.bind(null, 1, 2);
  add3(3, 4, 5);
  const add4 = add.bind(null, 1, 2, 3);
  add4(4, 5);
  const add5 = add.bind(null, 1, 2, 3, 4);
  add5(5);
}
