class DH extends Base {
  name = "Diffie-Hellman";

  renderInput(container) {
    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "n" }, [
          t("n"),
          h("input", {
            type: "number",
            name: "n",
            required: "required",
            autocomplete: "off",
            value: 23,
          }),
        ]),
        h("label", { for: "g" }, [
          t("g"),
          h("input", {
            type: "number",
            name: "g",
            required: "required",
            autocomplete: "off",
            value: 5,
          }),
        ]),
        h("label", { for: "x" }, [
          t("x"),
          h("input", {
            type: "number",
            name: "x",
            required: "required",
            autocomplete: "off",
            value: 6,
          }),
        ]),
        h("label", { for: "y" }, [
          t("y"),
          h("input", {
            type: "number",
            name: "y",
            required: "required",
            autocomplete: "off",
            value: 15,
          }),
        ]),
      ])
    );

    container.appendChild(
      h("button", { innerText: "Proceed", type: "submit" })
    );
  }

  Keys = { A: "", B: "" };

  calculate(formProps) {
    let NumberObj = {};
    for (const key in formProps) {
      const element = formProps[key];
      if (["n", "g", "x", "y"].includes(key))
        NumberObj[key] = parseInt(element);
      else NumberObj[key] = element;
    }
    const { n, g, x, y } = NumberObj;

    console.log({ n, g, x, y });

    const A = modPow(g, x, n);
    const B = modPow(g, y, n);

    this.Keys = {
      A: modPow(B, x, n),
      B: modPow(A, y, n),
    };
  }

  renderOutput(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Output")]));

    container.appendChild(
      h(
        "textarea",
        { readOnly: true, name: "e", rows: 8 },
        t(
          `Klucz A:${this.Keys.A}
Klucz B:${this.Keys.B}`
        )
      )
    );
  }

  renderMid(container) {}
}
