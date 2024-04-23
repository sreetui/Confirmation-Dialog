"use strict";

class ModalDialog {
  constructor() {
    this.toggle = false;
    this.templateSelector = "[data-template-for='modal-dialog']";
    this.modalContainer = document.querySelector(this.templateSelector);
    this.addListeners();
  }
  render() {
    this.toggle = !this.toggle;
    let modalContainer = (() => {
      const selector = ".modal-dialog-container";
      if (this.toggle) {
        return this.modalContainer.content.cloneNode(true).querySelector(selector);
      }
      return document.querySelector(selector);
    })();
    if (this.toggle) {
      document.body.appendChild(modalContainer);
      this.addOrRemoveModalListeners(modalContainer);

    } else {
      this.addOrRemoveModalListeners(modalContainer);
      document.body.removeChild(modalContainer);
    }

  }
  addOrRemoveModalListeners(modalContainer) {
    const [modalClose, modalOk] = [modalContainer.querySelector(".modal-close"), modalContainer.querySelector(".modal-ok")];
    const renderFn = this.render.bind(this);
    if (this.toggle) {
      modalClose.addEventListener("click", renderFn);
      modalOk.addEventListener("click", renderFn);
    } else {
      modalClose.removeEventListener("click", renderFn);
      modalOk.removeEventListener("click", renderFn);
    }
  }
  addListeners() {
    document.querySelector(".confirm-btn").addEventListener("click", this.handleClickListener.bind(this));

  }
  handleClickListener(event) {
    this.render();
  }
}
const modalDialog = new ModalDialog()
