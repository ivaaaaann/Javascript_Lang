type myObject = {
  name?: string;
  age: number;
  getFamilyName: () => string;
  getBloodType: () => string;
  getLastName: () => string;
};

const obj: myObject = {
  name: "dong hyun",
  age: 18,
  getFamilyName: () => {
    return "kim";
  },
  getBloodType: () => {
    return "A";
  },
  getLastName: () => "kim",
};

obj.name;
obj.age;

obj.getFamilyName();
obj.getBloodType();

class Person {
  _bloodType: string;

  constructor(bloodType: string) {
    this._bloodType = bloodType;
  }

  set bloodType(bType: string) {
    if (bType === "A" || bType === "B" || bType === "O" || bType === "AB") {
      this.bloodType = bType;
    }
  }

  get bloodType() {
    return `${this._bloodType} 형`;
  }
}

const p1 = new Person("A");
p1.bloodType = "C";

const myObj = Object.create(null, {
  name: {
    value: "kim mintae",
    writable: false,
    configurable: true,
  },
});

myObj.name = "saa";
