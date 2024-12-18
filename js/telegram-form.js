// Telegram Bot API constants
const TELEGRAM_BOT_TOKEN = "7064352264:AAF66qhrKxetKGYQKm_TomjTyJEWkG5NelY";
const TELEGRAM_CHAT_ID = "-4752576351";

// Функція для відображення повідомлень
function showCustomMessage(type, message) {
  const existingMessage = document.querySelector(".custom-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageEl = document.createElement("div");
  messageEl.classList.add("custom-message", `custom-message-${type}`);
  messageEl.innerHTML = `
        <div class="custom-message-inner">
            ${type === "success" ? "✅" : "❌"} ${message}
        </div>
    `;

  messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${type === "success" ? "#00bfff" : "#f44336"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        font-family: Arial, sans-serif;
        animation: slideIn 0.3s ease-out;
    `;

  const styleEl = document.createElement("style");
  styleEl.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes slideOut {
            from { opacity: 1; transform: translate(-50%, 0); }
            to { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;

  document.body.appendChild(messageEl);
  document.head.appendChild(styleEl);

  setTimeout(() => {
    messageEl.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => messageEl.remove(), 300);
  }, 3000);
}

// Функція для перевірки форми
function validateForm(form) {
  const name = form.querySelector("input[name='name']").value.trim();
  const drink = form.querySelector("input[name='drink']").value.trim();
  const mustHave = form.querySelector("input[placeholder='Введіть назву']").value.trim();
  const vote = form.querySelector("input[name='start']:checked");

  if (!name) {
    showCustomMessage("error", "Будь ласка, заповніть ім'я");
    return false;
  }
  if (!drink) {
    showCustomMessage("error", "Будь ласка, вкажіть ваш улюблений напій");
    return false;
  }
  if (!mustHave) {
    showCustomMessage("error", "Будь ласка, вкажіть, що має бути на столі");
    return false;
  }
  if (!vote) {
    showCustomMessage("error", "Будь ласка, оберіть, чий опис вам до вподоби");
    return false;
  }

  return true;
}

// Функція для надсилання даних у Telegram
async function sendToTelegram(event) {
  event.preventDefault();

  // Знаходимо форму, з якої прийшла подія
  const form = event.target.closest(".send-form");

  // Перевіряємо форму
  if (!validateForm(form)) return;

  // Збираємо дані з форми
  const name = form.querySelector("input[name='name']").value.trim();
  const drink = form.querySelector("input[name='drink']").value.trim();
  const mustHave = form.querySelector("input[placeholder='Введіть назву']").value.trim();
  const vote = form.querySelector("input[name='start']:checked").value.trim();

  // Формуємо повідомлення
  const message = `
Нова заявка:

👤 Ім'я: ${name}
🍷 Улюблений напій: ${drink}
🍽️ Обов'язково на столі: ${mustHave}
🎉 Обраний учасник: ${vote}
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    const result = await response.json();

    if (result.ok) {
      showCustomMessage("success", "Заявка успішно надіслана!");

      // Очищення форми
      form.reset();

      // Перенаправлення на Telegram канал
      setTimeout(() => {
        window.location.href = "https://t.me/+Cl0d9AzIDLM5OGIy";
      }, 1500);
    } else {
      showCustomMessage("error", "Помилка надсилання заявки");
    }
  } catch (error) {
    console.error("Помилка:", error);
    showCustomMessage("error", "Помилка надсилання заявки");
  }
}

// Прив'язка функції до всіх форм при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  // Знаходимо всі кнопки відправки форм
  const formButtons = document.querySelectorAll(".send-form button");

  // Додаємо обробник до кожної кнопки
  formButtons.forEach((button) => {
    button.addEventListener("click", sendToTelegram);
  });

  // Додаємо обробник submit до всіх форм для запобігання стандартної відправки
  const forms = document.querySelectorAll(".send-form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());
  });
});
