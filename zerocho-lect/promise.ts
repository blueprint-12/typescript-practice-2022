//복잡한 타입 분석하기
//😎Promise와 Await 편
//프로미스는 Promise<결괏값>타입으로 표시
const p1 = Promise.resolve(1) //Promise<number>
  .then((a) => a + 1) //Promise<number>
  .then((a) => a + 1) //Promise<number>
  .then((a) => a.toString()); // Promise<string>
//then을 전부 다 실행시킨 최종 결괏값을 p1에 리턴한다.

const p2 = Promise.resolve(2); // Promise<number>
const p3 = new Promise((res, rej) => {
  setTimeout(res, 1000);
});
// new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
// setTimeout(()=> { res(); }, 1000) 과 같아서 value를 안 넣었으니 unknown 값

Promise.all([p1, p2, p3]).then((result) => console.log(result));
//결과: ['3',2,undefined], result에 커서를 올려보면 최종 타입을 string number unknown 으로 정확히 추론되어 있음
//all 메서드는 lib.es2015.promise.d.ts 에 정의되어 있다.

//all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
{
  //P in keyof T 에서 T는 ->예시에서 [p1, p2, p3]
  // T = [p1,p2,p3] -> 배열을 객체로 표현해보면  {"0": p1, "1": p2, "2": p3, length: 3}이기 때문에 아래와 같은 결과
  //😎위와 같은 객체 모양은 TS에서 객체가 아니라 배열로 취급합니다.
  //keyof T = "0" | "1"| "2" | "length"
  const arr = [1, 2, 3];
  type Arr = keyof typeof arr; //arr에 as const를 붙여야 readonly [1, 2, 3] 가 나옴
  const key: Arr = "length";
}
{
  //Awaited<T[P]> -> 배열명[키] 즉 -> 배열의 "값"들을 await를 한다.
  //아래는 Awaited 명세(컨디셔널 타입이 3번이나 나왔는데 쫄지말고 주석 참고하면서 분석하면됨)

  //T는 p1,p2,p3 라고 했으니 첫번째 줄은 무시해도 된다.
  //extends(infer사용가능) 는 뒤에나오는 구절을 T가 만족하느냐를 묻는 것
  //infer는 추론을 해주는 것일수도 있지만 어떻게 보면 새로운 타입 변수를 만들어 내는 것(만들어낸 F를 통해서 다시한번 타입 추론을 하니까)
  //😎F는 fulfilled이고 F는 extends 뒤에 구절을 보니 함수꼴?
  //그 아랫줄은 Awaited<V> 재귀, V는 a변수라는 value
  type Awaited<T> = T extends null | undefined
    ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
    : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
    ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
      ? Awaited<V> // recursively unwrap the value
      : never // the argument to `then` was not callable
    : T; // non-object or non-thenable
}
