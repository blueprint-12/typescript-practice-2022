//선언 시에는 T자리에 뭐가 올 지 모른다. (제네릭이니까)
//제네릭을 사용할 때 타입이 정해진다.
{
  interface Array<T> {
    forEach(
      callbackfn: (value: T, index: number, array: T[]) => void,
      thisArg?: any
    ): void;
  }
  //사용할 때 T(제네릭)을 number로 지정하면 위에 선언된 T자리가 number로 된다고 생각하면 된다.
  //아래처럼 Array<number>로 직접 명시하는 경우는 ts가 제대로 추론하지 못할 때이다.
  //실행 시 제네릭의 자리에 넣어주는 값을 '타입 파라미터'라고 한다.
  //<number>add(1,2); 는 제네릭이 아니라 강제타입지정이다(as 로 바꾸는). 유의
  const a: Array<number> = [1, 2, 3];
  a.forEach((value) => {
    console.log(value);
  });
  [true, false, true].forEach((value) => {
    console.log(value);
  });
  //string | number | boolean
  ["123", 123, true].forEach((value) => {
    console.log(value);
  });
}

{
  interface Array<T> {
    map<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: any
    ): U[];
  }

  //map 분석
  const strings = [1, 2, 3].map((elem) => elem.toString()); // ["1","2","3"]
}
{
  interface Array<T> {
    //필터가 제대로 타입 추론을 못할 경우
    filter(
      predicate: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any
    ): T[];

    filter<S extends T>(
      //T는 number
      predicate: (value: T, index: number, array: T[]) => value is S,
      thisArg?: any
    ): S[];
  }
  //value % 2 가 unknown일지 value is S일지 골라야한다.
  //홀수값만 뽑아내는 식이기 때문에 value is S이다.
  //S는 number

  //타입이 문자열인 애들만 뽑아내고 싶은 것인데 결과를 보면
  //string | number []로 잘못추론하고있다. unknown보단 S로 한번 더 추론하고 있는 타입정의를 가져와서 재정의
  const predicate = (value: string | number): value is string =>
    typeof value === "string";

  //위의 식을 재정의해서 다시 filteredResult 의 타입 추론을 보면 string[] 으로 잘 나온다.
  const filteredResult = ["1", 2, "3", 4, "5"].filter(predicate);
}
{
  interface Arr<T> {
    forEach(callBack: (item: T) => void): void;
  }
  const a: Arr<number> = [1, 2, 3];
  a.forEach((item) => console.log(item));
  a.forEach((item) => {
    console.log(item);
    return "3";
  });
  //제네릭이 제대로 추론하지 못할 경우 직접 명시-> 권고되지않음
  a.forEach((item) => {
    console.log(item);
    item.toFixed(1);
  });

  const b: Arr<string> = ["1", "2", "3"];
  b.forEach((item) => {
    console.log(item);
    item.charAt(3);
  });
}
//타입을 직접 다 구현한다 하지말고 만들어보면서 타입을 수정하면 된다.

{
  interface Arr<T> {
    forEach(callback: (item: T, index: number) => void): void;
    //맵을 사용하는 순간에 새로운 제네릭인 S을 추가
    map<S>(callback: (v: T, i: number) => S): S[];
    //v가 T 타입인데 리턴값이 S가 될 수 없다는 말 하지만 S가 T의 부분집합일 경우
    //가능하다. 이럴 때 쓰는 것이 extends 키워드
    //커스텀 타입가드(형식 조건자) -> 넓은 타입을 좁은 타입으로 좁혀주는 것 predicate
    filter<S extends T>(callback: (v: T) => v is S): S[];
  }

  /*
  const a: Arr<number> = [1, 2, 3]; //a가 number니까 map의 v도 number
  const b = a.map((v, i) => v + 1); // [2,3,4]
  const c = a.map((v, i) => v.toString()); // ["1", "2" , "3"]
  const d = a.map((v, i) => v % 2 === 0); // [false, true, false]
  const e: Arr<string> = ["1", "2", "3"];
  const f = e.map((v) => +v); //string to number "f"의 추론이 number[] 로 나오면 성공!
  */

  //Array.filter 구현해보기
  const a: Arr<number> = [1, 2, 3];
  const b = a.filter((v): v is number => v % 2 === 0); // [2] b는 number[]이어야 한다.
  const c: Arr<number | string> = [1, "2", 3, "4", 5];
  const d = c.filter((v): v is string => typeof v === "string");

  //predicate을 밖으로 빼도 되고 위처럼 인라인으로 작성해줘도 된다.
  const predicate = (v: string | number): v is number => typeof v === "number";
  const e = c.filter(predicate);
}
