class RSADecode extends Base {
  name = "RSADecode";

  renderInput(container) {
    container.appendChild(h("h1", {}, [t("Decode")]));

    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "d" }, [
          t("d"),
          h("input", {
            type: "number",
            name: "d",
            required: "required",
            autocomplete: "off",
            value: 463,
          }),
        ]),
        h("label", { for: "n" }, [
          t("n"),
          h("input", {
            type: "number",
            name: "n",
            required: "required",
            autocomplete: "off",
            value: 589,
          }),
        ]),
        h("label", { for: "msg" }, [
          t("msg"),
          h("input", {
            type: "text",
            name: "msg",
            value: "141 574 129 68 183",
            required: "required",
            autocomplete: "off",
          }),
        ]),
      ])
    );

    container.appendChild(
      h("button", { innerText: "Proceed", type: "submit" })
    );
  }

  Decoded = "";

  calculate(formProps) {
    this.Decoded = "";

    let NumberObj = {};
    for (const key in formProps) {
      const element = formProps[key];
      if (["d", "n"].includes(key)) NumberObj[key] = parseInt(element);
      else NumberObj[key] = element;
    }
    const { d, n, msg } = NumberObj;

    console.log({ d, n, msg });

    for (const c of msg.split(" ")) {
      if (c === "") continue;
      this.Decoded += `${String.fromCharCode(modPow(c, d, n))}`;
    }
  }

  renderOutput(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Output")]));

    container.appendChild(
      h("textarea", { readOnly: true, name: "e", rows: 8 }, t(this.Decoded))
    );
  }

  renderMid(container) {}
}
