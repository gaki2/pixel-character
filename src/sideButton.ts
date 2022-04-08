export default class SideButton {
  $wrapper: HTMLDivElement;
  $zoomInBtn: HTMLButtonElement;
  $zoomOutBtn: HTMLButtonElement;
  $changeBtn: HTMLButtonElement;
  $pixelizeBtn: HTMLButtonElement;
  $pixelizeWrapper: HTMLDivElement;
  $pixelBtnSpan: HTMLSpanElement;
  $changeBtnWrapper: HTMLDivElement;
  $changeBtnSpan: HTMLSpanElement;
  event: any;
  $resetBtn: HTMLButtonElement;
  constructor(pixelize: any, changeScale: any, changeCharacter: any, noPixelize: any) {
    this.wrapper();
    this.zoomInButton();
    this.zoomOutButton();
    this.changeButton();
    this.resetButton();
    this.pixelizeButton();
    this.event = {
      pixelize,
      changeScale,
      changeCharacter,
      noPixelize,
    };
  }

  wrapper() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "side_btn_wrapper";
    this.$wrapper.addEventListener("click", (e: any) => {
      const eventType = e.target.classList[0];
      switch (eventType) {
        case "pixelize_image":
          this.event.pixelize();
          break;
        case "zoom_in_image":
          this.event.changeScale(true);
          break;
        case "zoom_out_image":
          this.event.changeScale(false);
          break;
        case "reset_image":
          this.event.noPixelize();
          break;
        case "change_image":
          //   this.event.changeCharacter();
          this.event.changeCharacter();
          break;
        default:
          console.log("no event");
      }
    });
  }

  zoomInButton() {
    this.$zoomInBtn = document.createElement("button");
    this.$zoomInBtn.className = "zoom_in_image";
  }

  zoomOutButton() {
    this.$zoomOutBtn = document.createElement("button");
    this.$zoomOutBtn.className = "zoom_out_image";
  }

  changeButton() {
    // this.$changeBtnWrapper = document.createElement("div");
    // this.$changeBtnWrapper.className = "button_wrapper";
    this.$changeBtn = document.createElement("button");
    this.$changeBtn.className = "change_image";
    // this.$changeBtnSpan = document.createElement("span");
    // this.$changeBtnSpan.innerText = "어피치";
    // this.$changeBtnWrapper.appendChild(this.$changeBtn);
    // this.$changeBtnWrapper.appendChild(this.$changeBtnSpan);
  }

  resetButton() {
    this.$resetBtn = document.createElement("button");
    this.$resetBtn.className = "reset_image";
  }

  pixelizeButton() {
    // this.$pixelizeWrapper = document.createElement("div");
    // this.$pixelizeWrapper.className = "button_wrapper";
    this.$pixelizeBtn = document.createElement("button");
    this.$pixelizeBtn.className = "pixelize_image";
    // this.$pixelBtnSpan = document.createElement("span");
    // this.$pixelBtnSpan.innerText = "픽셀화";
    // this.$pixelizeWrapper.appendChild(this.$pixelizeBtn);
    // this.$pixelizeWrapper.appendChild(this.$pixelBtnSpan);
  }

  render($parent: HTMLElement) {
    this.$wrapper.appendChild(this.$pixelizeBtn);
    this.$wrapper.appendChild(this.$zoomInBtn);
    this.$wrapper.appendChild(this.$zoomOutBtn);
    // this.$wrapper.appendChild(this.$resetBtn);
    this.$wrapper.appendChild(this.$changeBtn);
    $parent.appendChild(this.$wrapper);
  }
}
