const lastTicket = document.querySelector("#lbl-new-ticket");
const btnCreate = document.querySelector("button");

function getLast() {
  fetch("/api/ticket/last")
    .then((resp) => resp.json())
    .then((data) => (lastTicket.innerText = data))
    .catch(console.log);
}

function createTicket() {
  fetch("/api/ticket/", {
    method: "POST",
  });
  getLast();
}

btnCreate.addEventListener("click", createTicket);
getLast();
