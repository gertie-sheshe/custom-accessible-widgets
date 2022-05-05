class Accordion {
  constructor(domNode) {
    this.rootEl = domNode;
    this.buttonEl = this.rootEl.querySelector("button[aria-expanded]");

    const controlsId = this.buttonEl.getAttribute("aria-controls");
    this.contentEl = document.getElementById(controlsId);

    this.open = this.buttonEl.getAttribute("aria-expanded") === true;

    // Event listeners
    this.buttonEl.addEventListener("click", this.onButtonClick.bind(this));
  }

  toggle(open) {
    if (open === this.open) {
      return;
    }

    // update the internal state
    this.open = open;

    // handle DOM updates
    this.buttonEl.setAttribute("aria-expanded", `${open}`);
    if (open) {
      this.contentEl.removeAttribute("hidden");
    } else {
      this.contentEl.setAttribute("hidden", "");
    }
  }

  onButtonClick() {
    this.toggle(!this.open);
  }

  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }
}

// init accordions
// const accordions = document.querySelectorAll(".accordion h3");
// accordions.forEach((accordionEl) => {
//   new Accordion(accordionEl);
// });
