// task-4.js — async/await та Promises

// 4.1: Promise, що переходить у fulfilled через ms мілісекунд
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 4.2: Імітація мережевого запиту з випадковою затримкою та випадковою помилкою
function simulateFetch(url) {
  return new Promise((resolve, reject) => {
    const randomDelay = Math.random() * 300 + 200; // 200–500мс

    setTimeout(() => {
      if (!url.startsWith("https")) {
        reject(new Error(`Invalid URL: ${url}`));
        return;
      }

      // 70% — успіх, 30% — помилка сервера (імітація нестабільного сервера)
      if (Math.random() < 0.7) {
        resolve({ url, status: 200, data: "OK" });
      } else {
        reject(new Error("Server error: 500"));
      }
    }, randomDelay);
  });
}

// 4.3: Повторюємо запит до attempts разів із затримкою 500мс між спробами
async function fetchWithRetry(url, attempts) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    console.log(`Спроба ${attempt}...`);

    try {
      const result = await simulateFetch(url);
      return result; // успіх — одразу повертаємо результат
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await delay(500); // чекаємо перед наступною спробою
      }
    }
  }

  // якщо жодна спроба не вдалась — кидаємо останню помилку
  throw lastError;
}

// 4.4: Завантажуємо всі URL паралельно, Promise.allSettled чекає на ВСІ результати (успіхи й помилки)
async function fetchMultiple(urls) {
  const results = await Promise.allSettled(urls.map((url) => simulateFetch(url)));

  return results.reduce(
    (acc, result) => {
      if (result.status === "fulfilled") {
        acc.successful.push(result.value);
      } else {
        acc.failed.push(result.reason.message);
      }
      return acc;
    },
    { successful: [], failed: [] },
  );
}

async function main() {
  console.log("=== Завдання 4: async/await ===");

  // 4.1
  console.time("delay");
  await delay(1000);
  console.timeEnd("delay"); // ~1000ms

  // 4.2
  try {
    const result = await simulateFetch("https://jsonplaceholder.typicode.com/posts");
    console.log("Успіх:", result);
  } catch (error) {
    console.error("Помилка:", error.message);
  }

  // 4.3 — retry для нестабільного сервера
  try {
    const result = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts", 5);
    console.log("fetchWithRetry результат:", result);
  } catch (error) {
    console.error("Всі спроби невдалі:", error.message);
  }

  // 4.4
  const results = await fetchMultiple([
    "https://jsonplaceholder.typicode.com/posts",
    "http://invalid-url",
    "https://jsonplaceholder.typicode.com/users",
  ]);
  console.log("Результати:", results);
}

main();