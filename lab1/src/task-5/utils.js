// utils.js — Допоміжні функції (named export) та клас BookCollection (default export)

// Фільтруємо книги за жанром
export function getBooksByGenre(books, genre) {
  return books.filter((book) => book.genre === genre);
}

// Середня кількість сторінок: спочатку reduce підсумовує pages всіх книг, потім ділимо на кількість
export function getAveragePages(books) {
  const total = books.reduce((sum, book) => sum + book.pages, 0);
  return total / books.length;
}

// Найстаріша книга: reduce без початкового значення —
// на кожному кроці порівнюємо поточну "найстарішу" з наступною книгою
export function getOldestBook(books) {
  return books.reduce((oldest, book) => (book.year < oldest.year ? book : oldest));
}

// default export — клас для роботи з колекцією книг
export default class BookCollection {
  constructor(books) {
    this.books = books;
  }

  // Повертаємо КОПІЮ масиву (через spread), відсортовану за роком, від старих до нових.
  // Оригінальний this.books залишається без змін
  getSortedByYear() {
    return [...this.books].sort((a, b) => a.year - b.year);
  }

  addBook(book) {
    this.books.push(book);
  }

  get count() {
    return this.books.length;
  }
}