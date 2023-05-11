class Stego extends Base {
  name = "Stego";

  renderInput(container) {
    container.appendChild(h("iframe", { src: "Subpages/Stego.html" }));
  }
}
