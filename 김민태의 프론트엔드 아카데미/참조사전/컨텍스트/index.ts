const person = {
  name: "lim dong hyun",
  age: 18,
  getAge() {
    return this.age;
  },
};

person.age;
person.getAge();

const age = person.getAge;

age();

age.call(person);

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.getAge = this.getAge.bind(this);
  }

  getAge() {
    return this.age;
  }

  getName = () => this.name;
}

const p1 = new Person("lim dong hyub", 18);

p1.getAge();

const myAge = p1.getAge;

myAge();

p1.getName();

const myName = p1.getName;

myName();
