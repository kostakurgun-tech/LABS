export {};

// 4.1: Абстрактний базовий клас — new BaseNotifier() заборонено компілятором,
// створювати можна лише конкретних нащадків (EmailNotifier, SmsNotifier)
abstract class BaseNotifier {
  // protected — доступне нащадкам, readonly — не можна змінити після конструктора
  constructor(protected readonly name: string) {}

  // Абстрактний метод — НЕ має реалізації тут, кожен нащадок ЗОБОВ'ЯЗАНИЙ його реалізувати
  abstract send(to: string, subject: string, body: string): void;

  // Шаблонний метод: спільна логіка "до" і "після", але саму відправку (send)
  // делегує конкретному нащадку — це і є поліморфізм
  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body);
    console.log(`[${this.name}] Сповіщення надіслано`);
  }
}

// 4.2: Email-канал
class EmailNotifier extends BaseNotifier {
  // private — доступне ЛИШЕ всередині цього класу, навіть нащадки EmailNotifier його не побачать
  constructor(private readonly smtpServer: string) {
    super("Email"); // викликаємо конструктор BaseNotifier, передаючи назву каналу
  }

  send(to: string, subject: string, body: string): void {
    const shortBody = body.slice(0, 50);
    console.log(
      `📧 Email → ${to}: "${subject}" | Тіло: ${shortBody} через ${this.smtpServer}`,
    );
  }
}

// 4.3: SMS-канал
class SmsNotifier extends BaseNotifier {
  // = "+380" — значення за замовчуванням, якщо при створенні префікс не передали
  constructor(private readonly phonePrefix: string = "+380") {
    super("SMS");
  }

  send(to: string, subject: string, body: string): void {
    const shortBody = body.slice(0, 160);
    console.log(`📱 SMS → ${this.phonePrefix}${to}: "${shortBody}"`);
  }
}

// 4.4: Надсилаємо одне повідомлення через ВСІ канали одразу.
// notifiers: BaseNotifier[] — масив може містити будь-яку комбінацію нащадків,
// але кожен викличе СВОЮ власну реалізацію notify -> send
function sendBulkNotification(
  notifiers: BaseNotifier[],
  to: string,
  subject: string,
  body: string,
): void {
  notifiers.forEach((notifier) => notifier.notify(to, subject, body));
}

console.log("=== Завдання 4: Наслідування та поліморфізм ===");

const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(),
];

// Параметр to — рядок-адресат; його формат залежить від каналу
sendBulkNotification(
  notifiers,
  "user@example.com",
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025",
);