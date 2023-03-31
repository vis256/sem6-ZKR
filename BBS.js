class BBS extends Base {
  name = "BBS";

  Bits = "";

  isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  gcd = (a, b) => {
    if (!b) {
      return a;
    }

    return this.gcd(b, a % b);
  };

  PrimeNumbers = [];

  getOptionsForPQ = () => {
    return this.PrimeNumbers.map((e) => {
      return h("option", { value: e }, [t(e)]);
    });
  };

  renderInput(container) {
    for (let i = 0; i < 3500; i++) {
      if (this.isPrime(i) && i % 4 === 3) {
        this.PrimeNumbers.push(i);
      }
    }

    container.appendChild(h("h1", {}, [t("Input")]));

    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "size" }, [
          t("Size"),
          h("input", {
            type: "number",
            name: "size",
            required: "required",
            autocomplete: "off",
            value: 32,
          }),
        ]),
        h("label", { for: "p" }, [
          t("p"),
          h(
            "select",
            {
              name: "p",
            },
            this.getOptionsForPQ()
          ),
        ]),
        h("label", { for: "q" }, [
          t("q"),
          h(
            "select",
            {
              name: "q",
            },
            this.getOptionsForPQ()
          ),
        ]),
        h("label", { for: "seed" }, [
          t("Seed"),
          h("input", {
            type: "number",
            name: "seed",
            required: "required",
            autocomplete: "off",
            value: 1096,
          }),
        ]),
      ])
    );

    container.appendChild(
      h("button", { innerText: "Proceed", type: "submit" })
    );
  }

  getBit(xi) {
    this.Bits += xi % 2;
  }

  calculate(formProps) {
    this.Bits = [];

    let NumberObj = {};
    for (const key in formProps) {
      const element = formProps[key];
      NumberObj[key] = parseInt(element);
    }
    const { p, q, size, seed } = NumberObj;

    console.log({ p, q, size, seed });

    if (!this.isPrime(p) || !this.isPrime(q)) {
      throw new Error("Liczby p i q muszą być liczbami pierwszymi");
    }

    const N = p * q;

    const gcdResult = this.gcd(N, seed);
    console.log({ gcdResult });

    if (gcdResult !== 1) {
      throw new Error("Liczby muszą być względnie pierwsze");
    }

    let xi = (seed * seed) % N;

    for (let i = 0; i < size; i++) {
      const x2 = xi * xi;
      xi = x2 % N;
      this.getBit(xi);
    }
  }

  renderOutput(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Output bit array")]));

    let ta = h("textarea", { readOnly: true }, t(this.Bits));

    ta.rows = Math.floor(this.Bits.length / 64);

    container.appendChild(ta);
  }

  renderMid(container) {}
}
