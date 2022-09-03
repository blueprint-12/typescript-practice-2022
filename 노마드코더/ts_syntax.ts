//✅암시 vs 명시 타입(Implicit vs Explicit )
{
  let a = "apple"; // 암시타입
  let b: boolean = false; // 명시타입
  let c: number[] = [];
  c.push(1);
}

//✅optional parameter(선택적 변수)
// 값이 있을 수도 ? 없을 수도 있다! 없을 떄는 undefined 할당
// ?:
{
  const player: {
    name: string;
    age?: number;
  } = {
    name: "cong",
  };
  //만약 아래의 조건식에서 player.age < 10만 쓰게되면 age가 undefined 인 경우도 있기 때문에
  //아래와 같이 써야 빨간 밑줄이 사라진다.
  if (player.age && player.age < 10) {
  }
}
//✅ Alias(별칭) 타입
// 개인적으로 클래스같다 라는 생각을 했음
//객체에만 국한되는 것이 아니라 모든 데이터에 사용할 수 있다.
{
  type Name = string; //별칭 타입은 객체가 아니더라도 이렇게 또 재활용 할 수 있게 분리할 수 있지만
  // 누가봐도 큰 의미가 없고 과하게 사용하면 좋지 않기 때문에 필요에 따라서 써야한다.

  type Player = {
    name: Name; //원래는 name:string, 이었음
    age?: number;
  };

  const cong: Player = {
    name: "cong",
  };
  const lynn: Player = {
    name: "lynn",
    age: 12,
  };
}
//✅ 함수의 return값의 타입을 지정하는 방법
{
  //위에서 쓴 별칭(에일리어스)의 예시를 가져와서
  type Player = {
    name: string;
    age?: number;
  };

  function playerMaker(name: string): Player {
    return {
      name,
    };
  }

  const nico = playerMaker("nico");
  nico.age = 12; // 위에서 playMaker 함수의 리턴 타입을 Player로 지정해줬기 때문에 이제 에러가 나지 않는다.
}

//✅return 타입 화살표 함수 ver
{
  type Player = {
    name: string;
    age?: number;
  };
  const playerMaker = (name: string): Player => ({ name });
}

//✅ readonly 속성 부여하기!!
// typescript 보호장치로 불변성을 얻을 수 있다.
// JS에서는 물론 객체가 변경가능하다. 하지만 ts에서 만큼은 js으로 변환되기 전까지 보호받을 수 있다!

{
  const names: readonly string[] = ["1", "2"];
  console.log(names);
}

// ✅Tuple (튜플)
// 배열의 요소가 정해진 개수와 순서에 따라 배열로 선언된다 -> 이 조건에 맞춰 배열을 생성
// readonly 와 같이 쓸 수 있다. (튜플 앞에 readonly 키워드)
{
  const player: [string, number, boolean] = ["안녕", 22, true];
  const cat: readonly [string, number, boolean] = ["나비", 2, false];
  player[0] = "잘 있어!";
  // cat[0] = "멍멍이"; //readonly속성때문에 타입이 같아도 오류 발생, 재할당X
}

//✅ undefined, null, any
/*any: 아무 타입 -> NEW!! TS의 보호장치로부터 벗어나고 싶을 때 쓴다. 최대한 안쓰는 것을 권장!
undefined: 선언X 할당X
null: 선언O 할당X
*/
{
  let a: undefined = undefined;
  let b: null = null;

  //TS
  const func1 = (
    paramName: string
  ): {
    name: string;
    age?: number;
  } => {
    return { name: paramName };
  };
  func1("유저 이름");

  //any를 통해서 TS 탈출!, param에  타입명시를 해주지 않아도 any가 임의적으로 할당된다.
  function sayHello(userName: any) {
    console.log(userName);
  }
  sayHello("도라미");
}
