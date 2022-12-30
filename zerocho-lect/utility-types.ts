//😋Partial

interface Profile {
  name: string;
  age: number;
  married: boolean;
}
const cong: Profile = {
  name: "cong",
  age: 27,
  married: false,
};

//Partial<>의 기능: 프로퍼티들을 전부 "?" 옵셔널로 만들어 준다.(필수값이었던 것들을)
const noMarriedCong: Partial<Profile> = {
  name: "cong",
  age: 28,
};
//Partial을 직접 구현해보기
//맵드 타입스랑 인덱스드 시그니처 사용
type Name = "Human" | "Animal";
//keyof 뒤에는 interface가 올 수 있다. (type alias도 가능, js적으로는 객체 가능)
type P<T> = {
  //어떤 객체가 오든지 그 객체의 키들을 여기에 쓴다.
  //type Name = Profile['name'] 을 응용하여 아래와 같이 작성
  // Profile.name 은 접근 안됨 TS에서는 위의 방법 사용
  //여기서 T는 Profile이다.
  //이 프로퍼티들은 값이 있어도 되고 없어도 되기때문에 ? 로 옵셔널을 걸어준다.
  [key in keyof T]?: T[key];
};

//😋Pick (Profile에서 원하는 프로퍼티만 뽑아오는 유틸리티 타입)
const pickedCong: Pick<Profile, "name" | "age"> = {
  name: "cong",
  age: 28,
};

//😋Omit (Profile에서 원하지않는 프로퍼티를 명시해주면 그것만 제외시켜주는 유틸리티 타입 )
const omittedCong: Omit<Profile, "married"> = {
  age: 29,
  name: "cong",
};
