{
  function add1(n1: number, n2: number, showResult: boolean, phrase: string) {
    if (showResult) {
      // let result = n1 + n2;
      console.log(phrase + (n1 + n2));
      //만약에 n1 + n2 가 string으로 되어서 52.8 이딴 식으로 된다면
      //소괄호로 연산을 먼저 처리하게 하거나 아니면 result 라는 변수를 만들어 두 값을 먼저 합침
    } else {
      return n1 + n2;
    }
  }

  //선언과 할당을 동시에 할 경우는, 암시적 타입 추론사용
  //선언만 할 경우는, 명시적으로 타입을 써주는 것이 좋은 습관
  let testNum: number;

  const number1 = 5;
  const number2 = 2.8;
  let printResult = true;
  const resultPhrase = "Result is ";

  add1(number1, number2, printResult, resultPhrase);
}
