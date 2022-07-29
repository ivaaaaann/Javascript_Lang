type Book = {
  title: string;
  copyright?: string;
  author?: string;
};

const books: string[] = [
  "헨리 6세",
  "리처드 3세",
  "실수 연발",
  "말괄량이 길들이기",
  "헨리 8세",
];

books.forEach((book: string, idx: number) => {
  console.log(book, idx);
});

const bookObjects: Book[] = books.map((book: string) => {
  return {
    title: book,
    author: undefined,
  };
});

console.log(bookObjects);

const ShakespeareOneBooks: Book[] = books
  .map((book: string) => ({
    title: book,
  }))
  .map((book: Book) => ({ ...book, author: "William Shakespeare" }));

console.log(ShakespeareOneBooks);

const bookTitleToBookOjbect = (book: string) => ({ title: book });
const makeAuthor = (name: string) => (book: Book) => ({
  ...book,
  author: name,
});

const shakespeareTwoBooks: Book[] = books
  .map(bookTitleToBookOjbect)
  .map(makeAuthor("William Shakespeare"));

const henry = shakespeareTwoBooks.filter((book: Book) =>
  book.title.includes("헨리")
);

console.log(henry);

const someNumbers: number[] = [10, 5, 3, 14, 56];

const sumNumber = someNumbers.reduce((a: number, b: number) => a + b, 0);

console.log(sumNumber);

type SomeObject = {
  [key: string]: string | number;
};

const someObjects: SomeObject[] = [
  { border: "none" },
  { fontSize: 24 },
  { className: "box sm-box" },
];

const someObject: SomeObject = someObjects.reduce(
  (a: SomeObject, b: SomeObject) => ({ ...a, ...b }),
  {}
);

console.log(someObject);

function sumNumbers(): number {
  return Array.from(arguments).reduce((a: number, b: number) => a + b, 0);
}

// console.log(sumNumbers(10, 20, 30, 40, 50));

function sumNumbersForTypeScript(...args: number[]): number {
  return args.reduce((a: number, b: number) => a + b, 0);
}

console.log(sumNumbersForTypeScript(10, 20, 30, 40, 50));
