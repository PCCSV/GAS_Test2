const API_URL =
  "https://script.google.com/macros/s/AKfycbyojooi1CDM_rW0-zVCS21pnCuA6tN-7jtQYDoZqRDQx9kl7CfLXhAjeO3R3vZMkWhfig/exec";

const loginForm =
  document
    .getElementById(
      "loginForm"
    );

loginForm?.addEventListener(

  "submit",

  async e => {

  e.preventDefault();

  const res =
    await fetch(

      API_URL,

      {

        method: "POST",

        body:
          JSON.stringify({

            action: "login",

            email:
              loginEmail.value,

            password:
              loginPassword.value

          })

      }

    );

  const json =
    await res.json();

  if (
    json.status === "success"
  ) {

    localStorage.setItem(

      "token",
      json.token

    );

    location.href =
      "index.html";

  }

  else {

    loginStatus.textContent =
      "Invalid login";

  }

});
