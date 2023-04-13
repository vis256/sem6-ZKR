class RSAKey extends Base {
  name = "RSAKey";

  Keys = {
    public: { e: "", n: "" },
    private: { d: "", n: "" },
  };

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

  modInverse(a, m) {
    for (let x = 0; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return null;
  }

  modExp(base, exponent, modulus) {
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = Math.pow(base, 2) % modulus;
    }
    return result;
  }

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

    container.appendChild(h("h1", {}, [t("Generate key")]));

    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "p" }, [
          t("p"),
          h(
            "select",
            {
              name: "p",
              id: "p-input",
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
              id: "q-input",
            },
            this.getOptionsForPQ()
          ),
        ]),
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
      ])
    );

    document.getElementById("p-input").value = 31;
    document.getElementById("q-input").value = 19;

    container.appendChild(
      h("button", { innerText: "Proceed", type: "submit" })
    );
  }

  calculate(formProps) {
    let NumberObj = {};
    for (const key in formProps) {
      const element = formProps[key];
      NumberObj[key] = parseInt(element);
    }
    const { p, q, e } = NumberObj;

    console.log({ p, q, e });

    if (!this.isPrime(p) || !this.isPrime(q)) {
      throw new Error("Liczby p i q muszą być liczbami pierwszymi");
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const d = this.calculateD(e, phi);

    const gcdResult = this.gcd(e, phi);

    if (gcdResult !== 1) {
      throw new Error("Liczby muszą być względnie pierwsze");
    }

    if (d === null) throw new Error("XCDFRGTHYJUI");

    this.Keys = {
      public: { e, n },
      private: { d, n },
    };
  }

  calculateD(e, phi) {
    return this.modInverse(e, phi);
  }

  renderOutput(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Output keys")]));

    container.appendChild(
      h(
        "textarea",
        { readOnly: true, name: "e", rows: 8 },
        t(`Public: 
  e: ${this.Keys.public.e}
  n: ${this.Keys.public.n}
      
Private:
  d: ${this.Keys.private.d}
  n: ${this.Keys.private.n}`)
      )
    );
  }

  renderMid(container) {}
}
