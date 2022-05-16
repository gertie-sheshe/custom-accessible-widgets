const CarouselPreviousNext = function (node, options) {
  // merge passed options with defaults
  options = Object.assign(
    { moreaccessible: false, paused: false, norotate: false },
    options || {}
  );

  // a prefers-reduced-motion user setting must always override autoplay
  const hasReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (hasReducedMotion.matches) {
    options.paused = true;
  }

  /* DOM properties */
  this.domNode = node;
  this.carouselItemNodes = node.querySelectorAll(".carousel-item");
  this.containerNode = node.querySelector(".carousel-items");
  this.liveRegionNode = node.querySelector(".carousel-items");

  this.pausePlayButtonNode = null;
  this.previousButtonNode = null;
  this.nextButtonNode = null;

  this.playLabel = "Start automatic slide show";
  this.pauseLabel = "Stop automatic slide show";

  /* State properties */

  // set when the user activates the play/pause button
  this.hasUserActivatedPlay = false;

  // This property for disabling auto rotation
  this.isAutoRotationDisabled = options.norotate;

  // This property is also set in updatePlaying method
  this.isPlayingEnabled = !options.paused;

  // length of slide rotation in ms
  this.timeInterval = 5000;

  // index of current slide
  this.currentIndex = 0;

  // save reference to setTimeout
  this.slideTimeout = null;

  // PAUSE Button
  let pauseBtn = document.querySelector(".carousel .controls button.rotation");

  if (pauseBtn) {
    this.pausePlayButtonNode = elem;
    this.pausePlayButtonNode.addEventListener(
      "click",
      this.handlePausePlayButtonClick.bind(this)
    );
  }

  // PREVIOUS Button
  let prevBtn = document.querySelector(".carousel .controls button.previous");

  if (prevBtn) {
    this.previousButtonNode = prevBtn;
    this.previousButtonNode.addEventListener(
      "click",
      this.handlePreviousButtonClick.bind(this)
    );

    this.previousButtonNode.addEventListener(
      "focus",
      this.handleFocusIn.bind(this)
    );
    this.previousButtonNode.addEventListener(
      "blur",
      this.handleFocusOut.bind(this)
    );
  }

  // NEXT Button
  let nextBtn = document.querySelector(".carousel .controls button.next");

  if (nextBtn) {
    this.nextButtonNode = nextBtn;
    this.nextButtonNode.addEventListener(
      "click",
      this.handleNextButtonClick.bind(this)
    );
    this.nextButtonNode.addEventListener(
      "focus",
      this.handleFocusIn.bind(this)
    );
    this.nextButtonNode.addEventListener(
      "blur",
      this.handleFocusOut.bind(this)
    );
  }

  // Carousel Item Events
  for (let i = 0; i < this.carouselItemNodes.length; i++) {
    let carouselItemNode = this.carouselItemNodes[i];

    // support stopping rotation when any element receives focus in the tabpanel
    carouselItemNode.addEventListener("focusin", this.handleFocusIn.bind(this));
    carouselItemNode.addEventListener(
      "focusout",
      this.handleFocusOut.bind(this)
    );

    let imageLinkNode = carouselItemNode.querySelector(".carousel-image a");

    if (imageLinkNode) {
      imageLinkNode.addEventListener(
        "focus",
        this.handleImageLinkFocus.bind(this)
      ); // NOTE: Convert these to rrow functions Gertie!
      imageLinkNode.addEventListener(
        "blur",
        this.handleImageLinkBlur.bind(this)
      );
    }
  }

  // Handle hover events
  this.domNode.addEventListener("mouseover", this.handleMouseOver.bind(this));
  this.domNode.addEventListener("mouseout", this.handleMouseOut.bind(this));

  // Initialize behaviour based on options
  this.enableOrDisableAutoRotation(options.norotate);
  this.updatePlaying(!options.paused && !options.norotate);
  this.setAccessibleStyling(options.moreaccessible);
  this.rotateSlides();
};
