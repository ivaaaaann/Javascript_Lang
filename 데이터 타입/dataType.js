var a = 5;
var b = 6;
a = b;
a = "b";

var obj1 = {
  a: 1,
  b: "bbb",
};

obj1.a = 2;

var obj2 = obj1;

var user = {
  name: "donghyun",
  gender: "male",
};

// var changeName = function (user, newName) {
//   return {
//     name: newName,
//     gender: user.gender,
//   };
// };

var copyObject = function (target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};

var user2 = changeName(user);
user2.name = "jung";

if (user !== user2) {
  console.log("정보가 변경 되었습니다.");
}

console.log(user.name, user2.name);
console.log(user === user2);

var c;
console.log(c);

var obj3 = {
  a: 1,
};

console.log(obj3.a);
console.log(obj3.b);
console.log(b);

var func = function () {};
var d = func();
console.log(d);

var arr1 = [];
arr1.length = 3;
console.log(arr1);

var arr2 = new Array(3);
console.log(arr2);

var arr3 = [undefined, undefined, undefined];
console.log(arr3);
