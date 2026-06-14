// task-3.js — Класи та наслідування

class MediaItem {
  // Статичний приватний лічильник — спільний для ВСІХ об'єктів класу,
  // використовується для автоматичної генерації унікальних id
  static #nextId = 1;

  // Приватне поле — доступне лише всередині класу, ззовні читається через getter id
  #id;

  constructor(title, year) {
    this.#id = MediaItem.#nextId;
    MediaItem.#nextId += 1;

    this.title = title;
    this.year = year;
  }

  get id() {
    return this.#id;
  }

  // Обчислюється кожен раз при зверненні — різниця між поточним роком і роком видання
  get age() {
    return new Date().getFullYear() - this.year;
  }

  getInfo() {
    return `[${this.id}] ${this.title} (${this.year})`;
  }

  // Статичний метод-компаратор для sort: сортує за роком видання (зростання)
  static compare(a, b) {
    return a.year - b.year;
  }
}

class Book extends MediaItem {
  constructor(title, year, author, pages) {
    // super викликає конструктор MediaItem — він встановить title, year та згенерує id
    super(title, year);
    this.author = author;
    this.pages = pages;
  }

  // Перевизначаємо getInfo для книги — інший формат рядка
  getInfo() {
    return `[${this.id}] ${this.title} — ${this.author} (${this.year}, стор. ${this.pages})`;
  }
}

class Movie extends MediaItem {
  constructor(title, year, director, duration) {
    super(title, year);
    this.director = director;
    this.duration = duration;
  }

  getInfo() {
    return `[${this.id}] ${this.title} — ${this.director} (${this.year}, ${this.duration} хв)`;
  }
}

console.log("=== Завдання 3: Класи ===");

const book1 = new Book("Кобзар", 1840, "Тарас Шевченко", 280);
const book2 = new Book("Clean Code", 2008, "Robert Martin", 464);
const movie1 = new Movie(
  "Тіні забутих предків",
  1965,
  "Сергій Параджанов",
  97,
);

console.log(book1.getInfo());
console.log(movie1.getInfo());
console.log("Вік книги:", book1.age, "років");

const items = [book1, book2, movie1];
const sorted = [...items].sort(MediaItem.compare);
console.log(
  "Відсортовано за роком:",
  sorted.map((i) => i.getInfo()),
);