let a = 10;
let b = a;

b = 20;

let o = {
  isLoading: false,
};

let o2 = o;

// o2.isLoading = true;

function foo(o) {
  o.isLoading = true;
}

foo(o);

console.log("done");
