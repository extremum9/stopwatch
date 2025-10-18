import { padNumber } from "./utils.js";

const DISPLAY_MASK = "00:00:00:00";
const TIMER_MS = 10;

class Stopwatch {
  selectors = {
    display: ".js-display",
    startButton: ".js-start-button",
    stopButton: ".js-stop-button",
    resetButton: ".js-reset-button",
  };

  startTime = 0;
  elapsedTime = 0;
  timer = null;

  constructor() {
    this.display = document.querySelector(this.selectors.display);
    this.startButton = document.querySelector(this.selectors.startButton);
    this.stopButton = document.querySelector(this.selectors.stopButton);
    this.resetButton = document.querySelector(this.selectors.resetButton);
    this.bindEvents();
  }

  update = () => {
    this.elapsedTime = performance.now() - this.startTime;

    const elapsedTime = this.elapsedTime;
    const hours = padNumber(Math.floor(elapsedTime / (1000 * 60 * 60)));
    const minutes = padNumber(Math.floor((elapsedTime / (1000 * 60)) % 60));
    const seconds = padNumber(Math.floor((elapsedTime / 1000) % 60));
    const milliseconds = padNumber(Math.floor((elapsedTime % 1000) / 10));

    this.display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  start = () => {
    if (!this.timer) {
      this.startTime = performance.now() - this.elapsedTime;
      this.timer = setInterval(this.update, TIMER_MS);
      this.startButton.style.display = "none";
      this.stopButton.style.display = "inline-block";
      this.resetButton.style.display = "none";
    }
  };

  stop = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.elapsedTime = performance.now() - this.startTime;
      this.startButton.style.display = "inline-block";
      this.stopButton.style.display = "none";
      this.resetButton.style.display = "inline-block";
    }
  };

  reset = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.display.textContent = DISPLAY_MASK;
    this.startButton.style.display = "inline-block";
    this.stopButton.style.display = "none";
    this.resetButton.style.display = "none";
  };

  bindEvents() {
    this.startButton.addEventListener("click", this.start);
    this.stopButton.addEventListener("click", this.stop);
    this.resetButton.addEventListener("click", this.reset);
  }
}

new Stopwatch();
