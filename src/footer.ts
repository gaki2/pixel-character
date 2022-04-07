import { isMobile } from "./util/utils";

export default class Footer {
  $wrapper: HTMLDivElement;
  $footer_fullscreen: HTMLDivElement;
  $footer_name: HTMLDivElement;
  fullScreen: any;

  constructor(fullScreen: any) {
    this.fullScreen = fullScreen;
    this.wrapper();
    this.name();
    this.fullscreen();
  }

  wrapper() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "footer_wrapper";
  }

  changeText(isFull: boolean) {
    if (isFull) {
      this.$footer_fullscreen.innerText = "exit fullscreen";
    } else {
      this.$footer_fullscreen.innerText = "fullscreen";
    }
  }

  fullscreen() {
    this.$footer_fullscreen = document.createElement("div");
    this.$footer_fullscreen.className = "fullscreen";
    this.$footer_fullscreen.innerText = "fullscreen";
    this.$footer_fullscreen.addEventListener("click", this.fullScreen);
  }

  name() {
    this.$footer_name = document.createElement("div");
    this.$footer_name.className = "footer_name";
    this.$footer_name.innerText = "24:26 projects";
  }

  render() {
    this.$wrapper.appendChild(this.$footer_name);
    if (!isMobile()) {
      this.$wrapper.appendChild(this.$footer_fullscreen);
    }
    document.body.appendChild(this.$wrapper);
  }
}
