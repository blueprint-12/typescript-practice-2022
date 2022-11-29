"use strict";
//Primitives(원시형) : number, string, boolean etc..
//참조형(more complex types..~): array, objects..
//Function types, parameters
//원시형
let age;
age = 12;
let userName;
userName = "Max";
let isInstructor;
isInstructor = true;
// null과 undefined는 변수에 할당하는 용도로는 잘 사용되지않고
// 그래서 원시형에서는 잠깐 제외
// ⭐참조형
let hobbies;
hobbies = ["sport", "cooking", "취미예시"];
// let person: {
//   name: string;
//   age: number;
// };
let person; // 아래의 타입 별칭 사용
person = {
    name: "Max",
    age: 32,
};
// person = {
//   isEmployee: true,
// };
//person타입의 객체 여러개 가진 array를 만들 수 있다.
// let people: {
//   name: string;
//   age: number;
// }[];
let people;
people = [
    {
        name: "에릭",
        age: 43,
    },
    { name: "에릭", age: 43 },
    { name: "에릭", age: 43 },
];
console.log(people);
//TS playground를 사용하지 않고 브라우저에서 확인해보려면
//npx tsc 파일명 or npm tsc 를 하면 .js파일로 컴파일해준다.
// Type inference 타입 추론하기
// 🔥"타입 추론 기능"은 TS가 제공하는 기능으로 권고되는 것이다.
// 선언과 동시에 할당함으로써 불필요한 타입명시를 줄여주는 것인데
// 명시적으로 써줘도 되지만 직접 명시하지 않아도 타입 추론이 가능한 것에는
// 굳이 사용하지 않아도 된다.
let course = "react- the complete guide";
//course = 123123;
// 유니언 타입 | 으로 내가 원하는 타입을 여러개 지정해 줄 수 있다.
let uniontyeps = "react";
uniontyeps = [1234];
// Functions & types
// 마우스 커서를 올려보면 return 타입의 타입 추론 기능으로 number라고 명시된 것을 알 수 있다.
// 계속 강조하지만 타입 추론이 되는 곳은 굳이 명시할 필요없다. 유니언으로 지정해줄 거 아니면
function add(a, b) {
    return a + b;
}
//아무것도 반환하지 않는 함수의 리턴타입은 void
//
function printSth(value) {
    console.log(value);
}
// Generics
// <T> 제네릭을 사용하면 타입의 유연성과 안정성 측면에서 좋다. any를 사용하는 것보다
//이 함수의 장점은 원본 배열을 건들지 않고 새로운 배열을 만들어내는 것
function insertAtBeginning(array, value) {
    const newArr = [value, ...array];
    return newArr;
}
const demoArr = [1, 2, 3];
const chagedArr = insertAtBeginning(demoArr, -1); // [-1,1,2,3,]
const stringArr = insertAtBeginning(["a", "b", "c"], "d"); //["a","b","c","d"]
// chagedArr[0].split(""); // 이 코드는 any때문에 오류가 나지않지만
// 컴파일을 하면 숫자에 .split() 메서드를 사용할 수 없어서 에러가 난다.
// 타입을 any로 지정하면 TS의 기능은 빛을 발하지 못한다 이때 사용하는 것이
// Generic이다.
