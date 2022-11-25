{
    var a = "apple";
    var b = false;
    var c = [];
    c.push(1);
}
{
    var player = {
        name: "cong",
    };
    if (player.age && player.age < 10) {
    }
}
{
    var cong = {
        name: "cong",
    };
    var lynn = {
        name: "lynn",
        age: 12,
    };
}
{
    function playerMaker(name) {
        return {
            name: name,
        };
    }
    var nico = playerMaker("nico");
    nico.age = 12;
}
{
    var playerMaker_1 = function (name) { return ({ name: name }); };
}
{
    var names = ["1", "2"];
    console.log(names);
}
{
    var player = ["안녕", 22, true];
    var cat = ["나비", 2, false];
    player[0] = "잘 있어!";
}
{
    var a = undefined;
    var b = null;
    var func1 = function (paramName) {
        return { name: paramName };
    };
    func1("유저 이름");
    function sayHello(userName) {
        console.log(userName);
    }
    sayHello("도라미");
}
