//UPDATED TS syntax ver 4.8
// 빈객체 타입 {}
// 객체 타입 Object
//-> 이 두가지 타입은 모든 타입을 받을 수 있는 것이라고 생각하면 된다.

{
  const x: {} = "hello";
  const y: Object = "hihi";
  const xx: object = {
    hello: "world",
  };
  //   const yy: object = "string"; object 타입에 string이라는 원시값 대입X

  const z: unknown = "hi"; //모든 타입이 들어가기 때문에 hi도 들어갈 수 있다.
  if (z) {
    z; //z의 타입이 {}이다. 파라미터로 들어온 z 는 unknown인데 true일때는 {}인 것
  } else {
    z; //unknown
  }
}
{
  //인덱스드 시그니처
  //객체의 키값도 string, 값도 전부 string이길 원할때
  type B = "Human" | "Mammal" | "Animal";
  type A = { [key in B]: string };
  const a: A = { Human: "cong", Animal: "cong", Mammal: "cong" };

  type C = { [key in B]: B }; //이런 식으로 값도 타입으로 지정해줄 수 있다.
  const c: C = { Animal: "Animal", Mammal: "Human", Human: "Mammal" };
}
