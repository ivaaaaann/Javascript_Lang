const arr = ["a", "b", "c", "d"];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

let i = 0;

while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

i = 0;

do {
  console.log(i);
  i++;
} while (i < arr.length);

for (const item of arr) {
  console.log(item);
}

for (const index in arr) {
  console.log(arr[index]);
}

const obj = {
  color: "red",
  width: 200,
  height: 200,
};

for (const key in obj) {
  console.log(key);
}
