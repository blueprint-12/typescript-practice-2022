function add(n1: number, n2: number) {
  return n1 + n2;
}

{
  //return type "void"
  //타입 추론을 사용하면 되기 때문에 굳이 명시적으로 적어주지 않아도 된다.
  function printResult1(num: number) {
    console.log("result :" + num); //result :7
  }
  //void 값을 리턴하는 친구를 console.log로 찍어보면 undefined가 뜬다.
  // return 하는 것이 없기 때문임
  console.log(printResult1(add(5, 2))); //undefiend

  //변수에 undefined 를 할당할 수는 있지만
  //함수에 return type을 undefined로 지정할 수 없다. -> void로 대체해야함
  //명시적으로 return type을 undefined로 할 수는 있다. 대신 함수 내부에 return; 으로 아무것도 반환하지 않는
  //return 문을 작성해 줘야 한다. ->하지만 굳이 하지않아도 되는 rare 케이스입니다.

  //   let combinedValues: Function; 부족한 타입명시
  let combinedValues: (a: number, b: number) => number;
  //add함수의 포인터 지정
  combinedValues = add;
  //   combinedValues = 5;//any 타입으로 지정된 변수면 재할당할 수 있기 때문에 TS에러가 나지않음
  //변수 타입을 Function으로 명시적으로 지정해주는 것도 방법이지만 다른 함수의 포인터를 넘기게 되면
  //원하는 기능을 하게 잘못된 기능을 TS에서 거를 수 없다.
  console.log(combinedValues(8, 8)); // 16
}
{
  //화살표함수 표기로 콜백함수를 표현해주면 된다.
  function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
  }

  //콜백함수로 익명함수 전달, 콜백함수의 타입은 addAndHandle에서 정의
  addAndHandle(10, 20, (result) => {
    console.log(result); //30
  });
}
