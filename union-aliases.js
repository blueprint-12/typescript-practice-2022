"use strict";
//✅Union 타입!
//Enum처럼 대문자로 시작 type 키워드와 같이 씀
{
    function combine(input1, input2, resultConversion) {
        let result;
        //+ 연산자를 쓰기 위해서 런타임에 한번 타입체킹
        if ((typeof input1 === "number" && typeof input2 === "number") ||
            resultConversion === "as-number") {
            result = +input1 + +input2;
            return result;
        }
        else {
            result = input1.toString() + input2.toString();
        }
        // if (resultConversion === "as-number") {
        //   //강제형변환
        //   return +result;
        // }
        // if (resultConversion === "as-text") {
        //   return result.toString();
        // }
        return result;
    }
    const combinedStringNumber = combine("20", "31", "as-number");
    console.log(combinedStringNumber); //51
    const combinedNames = combine("Max", "anna", "as-text");
    console.log(combinedNames);
    //런타임때 타입 체크가 필요한 것을 union 타입을 사용하면,
    //생략할 수 있다. -> 여러 개의 타입을 가지는 매개변수
}
