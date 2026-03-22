const API_URL =
  "https://script.google.com/macros/s/AKfycbyiYMpTeWzE4uWT4Gs3HaXqWklYnZeDxg0y6mBLLFG5WQdTx7NfqTQnHK83bdUFTZMU2g/exec";

const form =
  document.getElementById("form");

const nameInput =
  document.getElementById("name");

const emailInput =
  document.getElementById("email");

const messageInput =
  document.getElementById("message");

if (
  !localStorage.getItem(
    "token"
  )
) {

  location.href =
    "login.html";

};

form.addEventListener(
  "submit",
  async e => {

  e.preventDefault();

  const data = {

    name:
      nameInput.value,

    email:
      emailInput.value,

    message:
      messageInput.value

  };

  if (navigator.onLine) {

    const ok =
      await sendToServer(data);

    if (ok) form.reset();

  } else {

    await saveOffline(data);

    status.textContent =
      "Saved offline";

    form.reset();

  }

});

async function sendToServer(data) {

  try {

    const res =
      await fetch(API_URL, {

        method: "POST",

        body:
          JSON.stringify(data)

      });

    const json =
      await res.json();

    if (
      json.status === "success"
    ) {

      status.textContent =
        "Saved to Google Sheets";

      return true;

    }

  } catch (err) {

    status.textContent =
      "Connection error";

  }

  return false;

}

async function syncOffline() {

  if (!navigator.onLine)
    return;

  const items =
    await getAllOffline();

  for (const item of items) {

    const ok =
      await sendToServer(item);

    if (!ok) return;

  }

  await clearOffline();

}

window.addEventListener(
  "online",
  syncOffline
);

syncOffline();
