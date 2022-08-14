function increment() {
  let saveNumber = 1;

  return function () {
    return saveNumber++;
  };
}

const inc = increment();

// increment();
// increment();
// increment();

inc();
inc();
inc();
