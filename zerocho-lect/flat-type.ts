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

  const c = [1, 2, 3, [1, 2], [[1], [2]]].flat(2);
  //flat의 매개변수로 몇 차원을 낮출 것인지 넘겨줄 수 있다.

  /* 기본적으로 1차원이라는 것은 number =1로 알 수 있다. D가 depth를 나타내므로
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
}
{
  type A = {
    name: string;
    age: number;
  };

  //위에 객체 뒤에 속성접근자와 같은 예시임
  type B = A["age"];
}
