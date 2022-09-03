//암시 vs 명시 타입(Implicit vs Explicit )
{
  let a = "apple"; // 암시타입
  let b: boolean = false; // 명시타입
  let c: number[] = [];
  c.push(1);
}

//optional parameter(선택적 변수)
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
// Alias(별칭) 타입
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
// 함수의 return값의 타입을 지정하는 방법
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

//return 타입 화살표 함수 ver
{
  type Player = {
    name: string;
    age?: number;
  };
  const playerMaker = (name: string): Player => ({ name });
}
