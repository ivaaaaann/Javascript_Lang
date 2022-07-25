function addAge(age) {
  if (typeof age === "number") {
    return age + 1;
  } else {
    throw Error;
  }
}

let age = addAge("30");

console.log(age);

age = 10;
age = false;
age = {};
