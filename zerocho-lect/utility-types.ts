//๐Partial

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

//Partial<>์ ๊ธฐ๋ฅ: ํ๋กํผํฐ๋ค์ ์ ๋ถ "?" ์ต์๋๋ก ๋ง๋ค์ด ์ค๋ค.(ํ์๊ฐ์ด์๋ ๊ฒ๋ค์)
const noMarriedCong: Partial<Profile> = {
  name: "cong",
  age: 28,
};
//Partial์ ์ง์  ๊ตฌํํด๋ณด๊ธฐ
//๋งต๋ ํ์์ค๋ ์ธ๋ฑ์ค๋ ์๊ทธ๋์ฒ ์ฌ์ฉ
type Name = "Human" | "Animal";
//keyof ๋ค์๋ interface๊ฐ ์ฌ ์ ์๋ค. (type alias๋ ๊ฐ๋ฅ, js์ ์ผ๋ก๋ ๊ฐ์ฒด ๊ฐ๋ฅ)
type P<T> = {
  //์ด๋ค ๊ฐ์ฒด๊ฐ ์ค๋ ์ง ๊ทธ ๊ฐ์ฒด์ ํค๋ค์ ์ฌ๊ธฐ์ ์ด๋ค.
  //type Name = Profile['name'] ์ ์์ฉํ์ฌ ์๋์ ๊ฐ์ด ์์ฑ
  // Profile.name ์ ์ ๊ทผ ์๋จ TS์์๋ ์์ ๋ฐฉ๋ฒ ์ฌ์ฉ
  //์ฌ๊ธฐ์ T๋ Profile์ด๋ค.
  //์ด ํ๋กํผํฐ๋ค์ ๊ฐ์ด ์์ด๋ ๋๊ณ  ์์ด๋ ๋๊ธฐ๋๋ฌธ์ ? ๋ก ์ต์๋์ ๊ฑธ์ด์ค๋ค.
  [key in keyof T]?: T[key];
};

//Pick ์ง์  ๊ตฌํํ๊ธฐ
//์ ๋ค๋ฆญ๋ค์ ์ธ ๋์๋ ์๋ก ๊ฐ์ ์ ํ์กฐ๊ฑด์ ๋จผ์  ๋ถ์ฌ์ค์ผ ํ๋ค.
//์ ๋ค๋ฆญ์ด ์๋ฌด ๊ฐ์ด๋ ๋๋ ๊ฒ์ด ์๋๋ผ ์ ๋ค๋ฆญ ๊ฐ์ ๊ท์น์ด ์๊ธฐ ๋๋ฌธ์ด๋ค.
//์๋์์ Profile ๊ณผ "name" | "age" ์ ๊ด๊ณ๊ฐ T์ S์ ๊ด๊ณ๋ผ๊ณ  ํ์ ๋ ๋์ ๊ด๊ณ๋ฅผ ๋จผ์ 
//์ฐ๊ฒฐ์์ผ์ฃผ๊ณ  ๊ตฌํ๋ถ(body)๋ฅผ ์์ฑํ๋ค.
type MyPick<T, S extends keyof T> = {
  [key in S]: T[key];
};

//๐Pick (Profile์์ ์ํ๋ ํ๋กํผํฐ๋ง ๋ฝ์์ค๋ ์ ํธ๋ฆฌํฐ ํ์)
const pickedCong: Pick<Profile, "name" | "age"> = {
  name: "cong",
  age: 28,
};

//๐Omit (Profile์์ ์ํ์ง์๋ ํ๋กํผํฐ๋ฅผ ๋ช์ํด์ฃผ๋ฉด ๊ทธ๊ฒ๋ง ์ ์ธ์์ผ์ฃผ๋ ์ ํธ๋ฆฌํฐ ํ์ )
const omittedCong: Omit<Profile, "married"> = {
  age: 29,
  name: "cong",
};

//Omit์ ๋ฐ๋ก ์ง์  ๋ง๋ค ์ ์๋ ๊ฒ ์๋๋ผ, Exclude์ Pick ์ด๋ผ๋ ์ ํ๋ฆฌํฐ ํ์์
//๋ํด์ ์๊ณ  ์์ด์ผ ํ๋ค.

//Exclude ๋ T ํ์์์ U๋ฅผ ๋นผ๋ ๊ฒ์ด๋ค.
{
  /**
   * Exclude from T those types that are assignable to U
   */
  type Exclude<T, U> = T extends U ? never : T;
}
type A = Exclude<keyof Profile, "married">;

// ์ ํ ์กฐ๊ฑด S extends keyof any -> S๋ string | number | symbol
// lib.es5.d.ts ๋ช์์ keyof T ๋ ์๊ฒ ๋๋ฐ keyof any๋ ๋ฌด์์ผ๊น? ๋ผ๋ ๊ฒ์ ๊ณ ๋ฏผํ๋ฉด์ ํ์ธ
// -> ํ๋ ค๋ณด๋ฉด ์๋ฌ๋ฉ์ธ์ง์ ์ด๋ค ์๋์ธ์ง ์ ์ ์๋ค.

// type Exclude<T, U> = T extends U ? never : T; -> never์ ๋ฒ๋ฆฐ๋ค๋ ์๋ฏธ: never์ ์ฐ์ด์ง์์ผ๋๊น(T๊ฐ U์ ๋ถ๋ถ์งํฉ์ด๋ฉด?)
// type Extract<T, U> = T extends U ? T : never;
// ์ ๋ค๋ฆญ์์ extends ์ด๋ฉด 3ํญ ์ฐ์ฐ์๋ฅผ ์ธ ์ ์๋ค.
// ์๋ ์์์์ T๋ Animal ์ด๊ณ  U๋ ๋๋ฒ์งธ ์ธ์์ธ "Human" ์ด๋ค.
type Animal = "Cat" | "Dog" | "Human";
type Mammal = Exclude<Animal, "Human">; // Mammal ์ Dog | Cat
type Human = Extract<Animal, "Human">; // Human ์ "Human" -> ์ฆ, Exclude์ ๋ฐ๋
