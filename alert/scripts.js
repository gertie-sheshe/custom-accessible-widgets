window.addEventListener("load", function () {
  let button = document.getElementById("alert-trigger");

  button.addEventListener("click", addAlert);
});

function addAlert() {
  let alertSect = document.getElementById("alert-sect");
  let template = document.getElementById("alert-template").innerHTML;

  alertSect.innerHTML = template;
}
