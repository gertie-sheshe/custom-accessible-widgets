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
};
