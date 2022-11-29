# typescript-practice-2022

타입스크립트에 대해 공부한 자료를 올리는 개인 레포입니다.

- tsc watch mode: 매번 해당 파일을 js로 컴파일할 필요없이 변동사항이 생기면 알아서 재컴파일
  (개발 시 이 모드를 취소할 필요없이 ctrl + c 를 통해 중단가능)

- 컴파일할 파일이 여러 개일 경우,

```bash
tsc --init #tsconfig.json 생성
tsc #해당 경로의 모든 ts파일 감시
```

```bash
tsc app.ts --watch #or -w
```

## 개발환경 설치 라이브러리

1. dev환경에 라이브러리 설치

```bash
yarn add lite-server --dev
```

2. package.json의 script에 "start":"lite-server" 추가

```javascript
"scripts": {
    "start": "lite-server"
  },
```
