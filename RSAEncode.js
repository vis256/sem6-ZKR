class RSAEncode extends Base {
  name = "RSAEncode";

  renderInput(container) {
    container.appendChild(h("h1", {}, [t("Encode")]));

    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "e" }, [
          t("e"),
          h("input", {
            type: "number",
            name: "e",
            required: "required",
            autocomplete: "off",
            value: 7,
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
            value: "ABCDE",
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

  Encoded = "";

  calculate(formProps) {
    this.Encoded = "";

    let NumberObj = {};
    for (const key in formProps) {
      const element = formProps[key];
      if (["e", "n"].includes(key)) NumberObj[key] = parseInt(element);
      else NumberObj[key] = element;
    }
    const { e, n, msg } = NumberObj;

    console.log({ e, n, msg });

    for (const char of msg) {
      const m = char.charCodeAt(0);
      // this.Encoded += `${Math.pow(m, e) % n} `;
      this.Encoded += `${modPow(m, e, n)} `;
    }
  }

  renderOutput(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Output")]));

    container.appendChild(
      h("textarea", { readOnly: true, name: "e", rows: 8 }, t(this.Encoded))
    );
  }

  renderMid(container) {}
}
