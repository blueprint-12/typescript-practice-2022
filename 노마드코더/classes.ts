// classes

/* private는 해당 클래스에서만 접근가능한 값(해당 클래스나 해당 클래스로 만들어진 인스턴스만 접근이 가능하지만
추상 클래스라서 인스턴스를 생성할 수 없다.) */
//public 어디서든 접근 가능한 값
//protected 상속받은 클래스들에서도 접근가능한 값

abstract class User {
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected nickName: string
  ) {}

  // static 멤버는 클래스의 특정 인스턴스와 연결되지 않음-> 클래스의 인스턴스화를 거치지않아도 클래스 생성자 객체를 통해 액세스할 수 있음  public protected private과 함께 사용가능
  static sayHello() {
    return console.log("hello");
  }
  abstract getNickName(): void;
  getFullName() {
    return `${this.firstName} ${this.lastName} `;
  }
}

{
  class Player extends User {
    getNickName() {
      console.log("hello 구현완료");
    }
  }

  const cong = new Player("Cong", "Nguyen", "Congo");
  // cong.firstName; //property 'firstName' is protected and only accessible within class 'Player'.ts(2341)

  // cong.nickName; // 퍼블릭으로 설정한 값만 에러가 뜨지 않고 값에 접근할 수 있다.
  cong.getFullName();
}

// Abstract Class 추상 클래스: 다르 클래스가 상속받을 수 있는 클래스를 말한다. 하지만 이 클래스는 직접 새로운 인스턴스를 만들 수는 없다.=> new User() 불가능

// abstract method 추상 메서드: 다른 메서드와 다르게 call signature만 작성해야 한다. 내부 코드(메서드 자체 구현)를 전부 작성해서는 안됨 구현은 사용하는 상속 클래스에서 한다.
