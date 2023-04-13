class Base {
  name = "Base";

  render(container) {
    const screen = g("main");

    const onsubmitBound = this.onsubmit.bind(this);

    let newSection = h("article", {}, [
      h("h1", { innerText: this.name, classList: ["title"] }),
      h("form", {
        id: `${this.name}-inputs`,
        onsubmit: onsubmitBound,
      }),
      h("form", { id: `${this.name}-internals` }),
      h("form", { id: `${this.name}-outputs` }),
    ]);

    screen.appendChild(newSection);

    this.renderInput(g(`${this.name}-inputs`));
  }

  renderInput(container) {
    console.error("Handle this");
  }

  renderMid(container) {
    console.error("Handle this");
  }

  renderOutput(container) {
    console.error("Handle this");
  }

  calculate(formProps) {
    console.error("Handle this");
  }

  onsubmit(e) {
    const self = this;
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    self.calculate(formProps);
    self.renderMid(g(`${self.name}-internals`));
    self.renderOutput(g(`${self.name}-outputs`));
  }
}
