{
  let userInput: unknown;
  let userName: string;

  //✅unknown타입
  //어떤 값이 들어올 지 모를 때 any대신 unkown을 지정하면
  // 어떤 값이든 할당할 수 있다.(컴파일 오류 x)
  //any랑 비슷해보이지만 unknown이 any보다는 더 제한적, 추가적인 타입 체킹이 있어야 한다.

  userInput = 5;
  userInput = "max";
  if (typeof userInput === "string") {
    userName = userInput;
  }
}
{
  //✅Never타입: 일반적으로 함수의 리턴 타입으로 사용된다.
  // 함수의 리턴 타입으로 never가 사용될 경우, 항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음을 의미
  // 이는 무한 루프에 빠지는 것과 같다.
  //에러 발생 시, 커스텀 에러 객체 반환
  function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };
  }

  let test = generateError("an error occurred", 500);
  console.log(test); //콘솔에 아무것도 안뜸 리턴값이 없으므로 test변수에는 undefined가 할당되어있다.
}
