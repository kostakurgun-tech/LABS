// index.js — головний файл, демонструє роботу всіх модулів

import { LIBRARY_NAME, books } from "./data.js";
import BookCollection, {
  getBooksByGenre,
  getAveragePages,
  getOldestBook as findOldestBook, // перейменування named export через "as"
} from "./utils.js";

console.log("=== Завдання 5: Модулі ===");
console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг:", books.length);

console.log("Книги жанру 'роман':", getBooksByGenre(books, "роман"));
console.log("Середня кількість сторінок:", getAveragePages(books));
console.log("Найстаріша книга:", findOldestBook(books));

const collection = new BookCollection(books);
console.log("Кількість книг у колекції:", collection.count);

collection.addBook({
  title: "Тіні забутих предків",
  author: "Михайло Коцюбинський",
  year: 1911,
  pages: 180,
  genre: "повість",
});
console.log("Кількість після додавання:", collection.count);

console.log(
  "Відсортовано за роком:",
  collection.getSortedByYear().map((b) => `${b.title} (${b.year})`),
);