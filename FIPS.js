class FIPS extends Base {
  name = "FIPS";

  Bits = "";

  Tests = {
    1: { pass: undefined, msg: "" },
    2: { pass: undefined, msg: "" },
    3: { pass: undefined, msg: "" },
    4: { pass: undefined, msg: "" },
    5: { pass: undefined, msg: "" },
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

  PrimeNumbers = [];

  getOptionsForPQ = () => {
    return this.PrimeNumbers.map((e) => {
      return h("option", { value: e }, [t(e)]);
    });
  };

  renderInput(container) {
    container.appendChild(h("h1", {}, [t("Input")]));

    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "input" }, [
          t("Input"),
          h("textarea", {
            name: "input",
            required: "required",
            autocomplete: "off",
          }),
        ]),
      ])
    );

    container.appendChild(h("button", { innerText: "Test", type: "submit" }));
  }

  test1() {
    const lower = 9725 / 20000;
    const higher = 10275 / 20000;

    let ones = 0;
    let count = 0;
    for (const bit of this.Bits) {
      if (bit === "1") ones++;
      count++;
    }

    const ratio = ones / count;

    if (ratio > lower && ratio < higher) return { pass: true, msg: "" };
    return { pass: false, msg: `${ratio} not in [${lower};${higher}]` };
  }

  test2() {
    const len = this.Bits.length;
    // 01010
    const data = {
      1: { lower: 2315 / 20000, higher: 2685 / 20000 },
      2: { lower: 1114 / 20000, higher: 1386 / 20000 },
      3: { lower: 527 / 20000, higher: 723 / 20000 },
      4: { lower: 240 / 20000, higher: 384 / 20000 },
      5: { lower: 103 / 20000, higher: 209 / 20000 },
      6: { lower: 103 / 20000, higher: 209 / 20000 },
    };

    let counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    console.log({ counts });

    let c = 0;
    for (const bit of this.Bits) {
      if (bit === "1") {
        c++;
      } else {
        if (c > 6) c = 6;
        counts[c]++;
        c = 0;
      }
    }

    if (c > 0) {
      if (c > 6) c = 6;
      counts[c]++;
    }

    for (const key in data) {
      const c = counts[key] / this.Bits.length;
      const bounds = data[key];

      if (c > bounds.lower && c < bounds.higher) {
      } else {
        return { pass: false, msg: "" };
      }
    }
    return { pass: true, msg: "" };
  }

  test3() {
    let highest = 0;

    let c = 0;
    for (const bit of this.Bits) {
      if (bit === "1") {
        c++;
      } else {
        if (c > highest) highest = c;
        c = 0;
      }
    }

    if (c > 0) {
      if (c > highest) highest = c;
    }

    if (highest >= 26) {
      return { pass: false, msg: `Seria za duża: ${highest} >= 26` };
    }

    return { pass: true, msg: "" };
  }

  test4() {
    const segments = this.Bits.match(/.{1,4}/g);
    console.log(segments);

    const segmentCounts = {};

    for (const segment of segments) {
      if (segment.length !== 4) continue;
      if (segmentCounts[segment]) segmentCounts[segment]++;
      else segmentCounts[segment] = 1;
    }

    console.log(segmentCounts);

    // let sum = Object.values(segmentCounts).reduce((sum, value) => {
    // console.log({ sum, value });
    // return sum + value * value;
    // });

    let sum = 0;

    for (const key in segmentCounts) {
      const count = segmentCounts[key];
      sum += count * count;
    }

    console.log(sum);

    const X = (sum / 5000) * 16 - 5000;

    if (X > 2.16 && X < 46.17) return { pass: true, msg: "" };
    return { pass: false, msg: `X=${X}` };
  }

  calculate(formProps) {
    this.Bits = formProps.input;

    this.TestResults = {
      1: this.test1(),
      2: this.test2(),
      3: this.test3(),
      4: this.test4(),
    };
  }

  renderMid(container) {}

  getResultElement(testIndex) {
    let li = h("li", { classList: ["row"] });

    const result = this.TestResults[testIndex].pass;

    let msg = h("h3");

    switch (result) {
      case true:
        msg.appendChild(t("Passed"));
        msg.style.color = "#00ff00";
        break;

      case false:
        msg.appendChild(t("Failed"));
        msg.style.color = "#ff0000";
        break;

      case undefined:
        msg.appendChild(t("Test not implemented"));
        msg.style.color = "#fffa";
        break;
      default:
        break;
    }

    li.appendChild(msg);
    li.appendChild(t(this.TestResults[testIndex].msg));

    return li;
  }

  renderOutput(container) {
    container.appendChild(h("h1", {}, [t("Output")]));

    let ul = h("ul");
    ul.appendChild(this.getResultElement(1));
    ul.appendChild(this.getResultElement(2));
    ul.appendChild(this.getResultElement(3));
    ul.appendChild(this.getResultElement(4));

    container.appendChild(ul);
  }
}

function find() {
  const test = new FIPS();
  const gen = new BBS();

  for (let i = 0; i < 700; i++) {
    if (gen.isPrime(i) && i % 4 === 3) {
      gen.PrimeNumbers.push(i);
    }
  }

  i = 0;
  for (const p of gen.PrimeNumbers) {
    // console.log(`${Math.round(i / gen.PrimeNumbers.length, 3)}%`);
    for (const q of gen.PrimeNumbers) {
      console.log(p, q);
      for (const seed of gen.PrimeNumbers) {
        try {
          gen.calculate({ p, q, size: 20000, seed: seed });
          const bits = gen.Bits;

          test.calculate({ input: bits });
          // console.log(p, q);
          if (
            test.TestResults[1].pass === true &&
            test.TestResults[2].pass === true &&
            test.TestResults[3].pass === true &&
            test.TestResults[4].pass === true
          ) {
            console.log("PASSED", test.TestResults, {
              p,
              q,
              size: 20000,
              seed: seed,
            });
            return;
          }
        } catch {
          continue;
        }
      }
    }
  }
  console.log("fnished");
}

// find();
