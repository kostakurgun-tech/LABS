// task-1.js — Деструктуризація та Spread/Rest

// 1.1: Повертаємо повне ім'я у формат "Прізвище І. Б." або "Прізвище І.", якщо немає по батькові
function getFullName({ firstName, lastName, middleName = "" }) {
  const firstInitial = firstName[0];

  if (!middleName) {
    return `${lastName} ${firstInitial}.`;
  }

  const middleInitial = middleName[0];
  return `${lastName} ${firstInitial}. ${middleInitial}.`;
}

// 1.2: Об'єднуємо будь-яку кількість об'єктів в один.
// Пізніші об'єкти перезаписують властивості попередніх (стандартна поведінка spread)
function mergeObjects(...objects) {
  return objects.reduce((merged, obj) => ({ ...merged, ...obj }), {});
}

// 1.3: Об'єднуємо всі масиви в один (flat), а Set залишає лише унікальні значення
function removeDuplicates(...arrays) {
  return [...new Set(arrays.flat())];
}

// 1.4: Повертаємо НОВИЙ об'єкт користувача з оновленими полями, оригінал не змінюється.
// address об'єднуємо окремо, щоб не загубити поля, які не передали в updates
function createUpdatedUser(user, updates) {
  return {
    ...user,
    ...updates,
    address: {
      ...user.address,
      ...updates.address,
    },
  };
}

console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");

console.log(
  "1.1:",
  getFullName({
    firstName: "Петро",
    lastName: "Іванов",
    middleName: "Сергійович",
  }),
); // "Іванов П. С."

console.log(
  "1.1 (без по батькові):",
  getFullName({ firstName: "Анна", lastName: "Коваль" }),
); // "Коваль А."

console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 })); // { a: 3, b: 2, c: 4 }

console.log("1.3:", removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5])); // [1, 2, 3, 4, 5]

const user = {
  name: "John",
  age: 25,
  address: { city: "Kyiv", zip: "01001" },
};
const updated = createUpdatedUser(user, {
  age: 26,
  address: { zip: "02002" },
});
console.log("1.4 updated:", updated); // age: 26, address: { city: "Kyiv", zip: "02002" }
console.log("1.4 original (без змін):", user); // age: 25, address: { city: "Kyiv", zip: "01001" }