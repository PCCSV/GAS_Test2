const API_URL =
  "https://script.google.com/macros/s/AKfycbz3PIz8A410fUDS_VsyXs6wxvbb-zJq1QlGotciZ7hfD5ISsjqOpcET1UN6KDKFwzB8mA/exec";

const form =
  document.getElementById("form");

form.addEventListener(
  "submit",
  async e => {

  e.preventDefault();

  const data = {

    name: name.value,
    email: email.value,
    message: message.value

  };

  if (navigator.onLine) {

    const ok =
      await sendToServer(data);

    if (ok) {
      form.reset();   // clear form
    }

  } else {

    await saveOffline(data);

    status.textContent =
      "Saved offline";

    form.reset();     // clear form locally

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
