//bind와 비슷하게 TS문법적 한계를 가진 또 다른 메서드 flat
//Array.flat()은 ES2019 이후 지원 최신 문법
//차원을 하나씩 낮추는 메서드이다. *1차원 배열은 그대로 간다.
//매개변수로 낮출 차원을 숫자로 넘겨준다.
{
  const a = [1, 2, 3, [1, 2], [[1], [2]]].flat();
  //a의 타입추론: (number | number[])[], number배열 혹은 number의 2차원 배열
  //제대로 타입 추론이 됐다.
  //[1, 2, 3, 1, 2, [1], [2]]

  const b = [1, 2, 3, [2, 3]].flat();
  //이것도 1차원 배열로 타입 추론이 잘 된다.

  //flat의 매개변수로 몇 차원을 낮출 것인지 넘겨줄 수 있다.
  const c = [1, 2, 3, [1, 2], [[1], [2]]].flat(2);
  //FlatArray<A,D>에서 D는 2이고 A는 내부 요소들 타입 즉, number[] | number[][] | number[][][]
  //recur: FlatArray<number | number [] | number[][], 1>
  //recur: FlatArray<number | number [], 0>
  // final: FlatArray<number, -1> 이렇게 done 조건인 -1가 되어서 c는 number 타입인가?
  // 할 수 있지만 마지막에 <A,D>[]로 배열이 하나 붙어있어서 "number[]" 타입을 갖게 된다.
  /* 기본적으로 1차원이라는 것은 number =1로 알 수 있다. D가 depth를 나타내므로
  //🤍recur할 때 number가 사라지는 이유는 배열이 아니라 삼항 연산자의 Arr부분이 리턴돼서 그런데
  //실질적으로 number | number | number [], 0 처럼 유니언으로 같은 타입이 반복되기 때문에 퉁쳐서 사라진 것이다.
  
  flat<A, D extends number = 1>(
        this: A,
        depth?: D
    ): FlatArray<A, D>[]
  */

  /*
  FlatArray 타입 정의: 객체 타입 정의 뒤에 []라는 속성접근자를 사용한다는 것은 done또는 recur를 가져온다는 말
    type FlatArray<Arr, Depth extends number> = {
    "done": Arr,
    "recur": Arr extends ReadonlyArray<infer InnerArr>
        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        : Arr
    }[Depth extends -1 ? "done" : "recur"];
    */

  //ReadonlyArray<T> 여기서 T는  readonly [n: number]: T; 이다.
  //즉, T는 배열 요소의 타입, 그렇다면 <infer InnerArr>의 의미는 "내부 배열 요소의 타입을 추론하라"
}
{
  type A = {
    name: string;
    age: number;
  };

  //위에 객체 뒤에 속성접근자와 같은 예시임,
  // 속성접근자 안에 3항연산자가 있으면 그냥 조건식인 것
  type B = A["age"];
  type C = A["1" extends number ? "age" : "name"];
  //type에서는 3 - 1 와 같은 빼기 연산이 되지않는다. 그렇다면 타입에서 빼기는 어떻게 표현할까
  //flat() 에서 Depth는 재귀호출되면서 1씩 낮춰치기 때문에
  //type D = 3-1;
}
