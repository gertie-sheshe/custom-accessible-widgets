let ICON_MUTE_URL = "#icon-mute";
let ICON_SOUND_URL = "#icon-sound";

const init = () => {
  const actionButton = document.getElementById("action");
  actionButton.addEventListener("click", activateActionButton);
  actionButton.addEventListener("keydown", actionButtonKeydownHandler);
  actionButton.addEventListener("keyup", actionButtonKeyUpHandler);

  const toggleButton = document.getElementById("toggle");
  toggleButton.addEventListener("click", toggleButtonClickHandler);
  toggleButton.addEventListener("keydown", toggleButtonKeydownHandler);
  toggleButton.addEventListener("keyup", toggleButtonKeyupHandler);
};

const activateActionButton = () => {
  window.print();
};

const actionButtonKeydownHandler = (event) => {
  // default action for space is already triggered on keydown. It needs to be
  // prevented to stop scrolling the page before activating the button.
  if (event.keyCode === 32) {
    // space
    event.preventDefault();
  } else if (event.keyCode === 13) {
    // If enter is pressed, activate the button
    event.preventDefault();
    activateActionButton();
  }
};

// Activates the action button with the space key.
const actionButtonKeyUpHandler = (event) => {
  if (event.keyCode === 32) {
    event.preventDefault();
    activateActionButton();
  }
};

const toggleButtonState = (button) => {
  let isAriaPressed = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", isAriaPressed ? "false" : "true");

  const icon = button.querySelector("use");
  icon.setAttribute(
    "xlink:href",
    isAriaPressed ? ICON_SOUND_URL : ICON_MUTE_URL
  );
};

const toggleButtonClickHandler = (event) => {
  if (
    event.currentTarget.tagName === "button" ||
    event.currentTarget.getAttribute("role") === "button"
  ) {
    toggleButtonState(event.currentTarget);
  }
};

const toggleButtonKeydownHandler = (event) => {
  // Toggles the toggle button’s state with the enter key.
  if (event.keyCode === 32) {
    event.preventDefault();
  } else if (event.keyCode === 13) {
    event.preventDefault();
    toggleButtonState(event.currentTarget);
  }
};

const toggleButtonKeyupHandler = (event) => {
  // Toggles the toggle button’s state with space key.
  if (event.keyCode === 32) {
    event.preventDefault();
    toggleButtonState(event.currentTarget);
  }
};

window.onload = init;
