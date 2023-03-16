class PlayfairEncode extends Base {
  name = "PlayfairEncode";

  Table = [];
  Output = "";

  renderInput(container) {
    container.appendChild(h("h1", {}, [t("Input")]));
    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "Input" }, [
          t("Input"),
          h("input", {
            type: "text",
            name: "input",
            required: "required",
            autocomplete: "off",
            value: "Hide the gold in the tree stump",
          }),
        ]),
        h("label", { for: "Keyword" }, [
          t("Keyword"),
          h("input", {
            type: "text",
            name: "keyword",
            required: "required",
            autocomplete: "off",
            value: "Playfair Example",
          }),
        ]),
      ])
    );

    container.appendChild(
      h("button", { innerText: "Proceed", type: "submit" })
    );
  }

  getItem = (row, column) =>
    this.Table.find((e) => e.row === row && e.column === column);

  calculate(formProps) {
    let tr = 0;
    let tc = 0;

    const findInTable = (letter) => this.Table.some((e) => e.letter === letter);

    const getLetter = (letter) => this.Table.find((e) => e.letter === letter);

    const addToTable = (letter) => {
      this.Table.push({ letter, row: tr, column: tc++ });
      if (tc > 4) {
        tr++;
        tc = 0;
      }
    };
    let input = formProps.input.toUpperCase();
    let keyword = formProps.keyword.toUpperCase();

    input = input.replaceAll(" ", "");
    keyword = keyword.replaceAll(" ", "");
    keyword = keyword.replaceAll("J", "I");

    for (let i = 0; i < keyword.length; i++) {
      const letter = keyword[i];
      if (!findInTable(letter)) {
        addToTable(letter);
      }
    }

    const alphabet = new Array(26)
      .fill(1)
      .map((_, i) => String.fromCharCode(65 + i));

    for (let letter of alphabet) {
      letter = letter.replaceAll("J", "I");
      if (!findInTable(letter)) {
        addToTable(letter);
      }
    }

    const len = input.length;

    if (len % 2 !== 0) {
      input = `${input}X`;
    }

    const inColumn = (i, j) => i.column === j.column;
    const inRow = (i, j) => i.row === j.row;

    const calculateColumn = (i, j) => {
      const e1 = this.getItem((i.row + 1) % 5, i.column);
      const e2 = this.getItem((j.row + 1) % 5, j.column);

      return e1.letter + e2.letter;
    };

    const calculateRow = (i, j) => {
      const e1 = this.getItem(i.row, (i.column + 1) % 5);
      const e2 = this.getItem(j.row, (j.column + 1) % 5);

      return e1.letter + e2.letter;
    };

    const caluclateBox = (i, j) => {
      const e1 = this.getItem(i.row, j.column);
      const e2 = this.getItem(j.row, i.column);

      return e1.letter + e2.letter;
    };

    for (let i = 0; i < input.length; i += 2) {
      const e1 = getLetter(input[i]);
      let e2 = getLetter(input[i + 1]);

      if (e1 === e2) {
        e2 = getLetter("X");
      }

      if (inColumn(e1, e2)) {
        this.Output += calculateColumn(e1, e2);
      } else if (inRow(e1, e2)) {
        this.Output += calculateRow(e1, e2);
      } else {
        this.Output += caluclateBox(e1, e2);
      }
    }
  }

  renderMid(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Table")]));
    container.appendChild(
      h("table", {}, [
        h("tbody", {}, [
          h("tr", {}, [
            h("td", {}, [t(this.getItem(0, 0).letter)]),
            h("td", {}, [t(this.getItem(0, 1).letter)]),
            h("td", {}, [t(this.getItem(0, 2).letter)]),
            h("td", {}, [t(this.getItem(0, 3).letter)]),
            h("td", {}, [t(this.getItem(0, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(1, 0).letter)]),
            h("td", {}, [t(this.getItem(1, 1).letter)]),
            h("td", {}, [t(this.getItem(1, 2).letter)]),
            h("td", {}, [t(this.getItem(1, 3).letter)]),
            h("td", {}, [t(this.getItem(1, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(2, 0).letter)]),
            h("td", {}, [t(this.getItem(2, 1).letter)]),
            h("td", {}, [t(this.getItem(2, 2).letter)]),
            h("td", {}, [t(this.getItem(2, 3).letter)]),
            h("td", {}, [t(this.getItem(2, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(3, 0).letter)]),
            h("td", {}, [t(this.getItem(3, 1).letter)]),
            h("td", {}, [t(this.getItem(3, 2).letter)]),
            h("td", {}, [t(this.getItem(3, 3).letter)]),
            h("td", {}, [t(this.getItem(3, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(4, 0).letter)]),
            h("td", {}, [t(this.getItem(4, 1).letter)]),
            h("td", {}, [t(this.getItem(4, 2).letter)]),
            h("td", {}, [t(this.getItem(4, 3).letter)]),
            h("td", {}, [t(this.getItem(4, 4).letter)]),
          ]),
        ]),
      ])
    );
  }

  renderOutput(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Output")]));
    container.appendChild(h("p", {}, t(this.Output)));
  }
}

class PlayfairDecode extends Base {
  name = "PlayfairDecode";

  Table = [];
  Output = "";

  renderInput(container) {
    container.appendChild(h("h1", {}, [t("Input")]));
    container.appendChild(
      h("div", { classList: ["grid"] }, [
        h("label", { for: "Input" }, [
          t("Input"),
          h("input", {
            type: "text",
            name: "input",
            required: "required",
            autocomplete: "off",
            value: "BMODZBXDNABEKUDMUIXMKZZRYI",
          }),
        ]),
        h("label", { for: "Keyword" }, [
          t("Keyword"),
          h("input", {
            type: "text",
            name: "keyword",
            required: "required",
            autocomplete: "off",
            value: "Playfair Example",
          }),
        ]),
      ])
    );

    container.appendChild(
      h("button", { innerText: "Proceed", type: "submit" })
    );
  }

  getItem = (row, column) =>
    this.Table.find((e) => e.row === row && e.column === column);

  calculate(formProps) {
    let tr = 0;
    let tc = 0;

    const findInTable = (letter) => this.Table.some((e) => e.letter === letter);

    const getLetter = (letter) => this.Table.find((e) => e.letter === letter);

    const addToTable = (letter) => {
      this.Table.push({ letter, row: tr, column: tc++ });
      if (tc > 4) {
        tr++;
        tc = 0;
      }
    };
    let input = formProps.input.toUpperCase();
    let keyword = formProps.keyword.toUpperCase();

    input = input.replaceAll(" ", "");
    keyword = keyword.replaceAll(" ", "");
    keyword = keyword.replaceAll("J", "I");

    for (let i = 0; i < keyword.length; i++) {
      const letter = keyword[i];
      if (!findInTable(letter)) {
        addToTable(letter);
      }
    }

    const alphabet = new Array(26)
      .fill(1)
      .map((_, i) => String.fromCharCode(65 + i));

    for (let letter of alphabet) {
      letter = letter.replaceAll("J", "I");
      if (!findInTable(letter)) {
        addToTable(letter);
      }
    }

    const len = input.length;

    if (len % 2 !== 0) {
      input = `${input}X`;
    }

    const inColumn = (i, j) => i.column === j.column;
    const inRow = (i, j) => i.row === j.row;

    const calculateColumn = (i, j) => {
      const e1 = this.getItem((i.row - 1) % 5, i.column);
      const e2 = this.getItem((j.row - 1) % 5, j.column);

      return e1.letter + e2.letter;
    };

    const calculateRow = (i, j) => {
      const e1 = this.getItem(i.row, (i.column - 1) % 5);
      const e2 = this.getItem(j.row, (j.column - 1) % 5);

      return e1.letter + e2.letter;
    };

    const caluclateBox = (i, j) => {
      const e1 = this.getItem(i.row, j.column);
      const e2 = this.getItem(j.row, i.column);

      return e1.letter + e2.letter;
    };

    for (let i = 0; i < input.length; i += 2) {
      const e1 = getLetter(input[i]);
      let e2 = getLetter(input[i + 1]);

      if (e1 === e2) {
        e2 = getLetter("X");
      }

      if (inColumn(e1, e2)) {
        this.Output += calculateColumn(e1, e2);
      } else if (inRow(e1, e2)) {
        this.Output += calculateRow(e1, e2);
      } else {
        this.Output += caluclateBox(e1, e2);
      }
    }
  }

  renderMid(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Table")]));
    container.appendChild(
      h("table", {}, [
        h("tbody", {}, [
          h("tr", {}, [
            h("td", {}, [t(this.getItem(0, 0).letter)]),
            h("td", {}, [t(this.getItem(0, 1).letter)]),
            h("td", {}, [t(this.getItem(0, 2).letter)]),
            h("td", {}, [t(this.getItem(0, 3).letter)]),
            h("td", {}, [t(this.getItem(0, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(1, 0).letter)]),
            h("td", {}, [t(this.getItem(1, 1).letter)]),
            h("td", {}, [t(this.getItem(1, 2).letter)]),
            h("td", {}, [t(this.getItem(1, 3).letter)]),
            h("td", {}, [t(this.getItem(1, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(2, 0).letter)]),
            h("td", {}, [t(this.getItem(2, 1).letter)]),
            h("td", {}, [t(this.getItem(2, 2).letter)]),
            h("td", {}, [t(this.getItem(2, 3).letter)]),
            h("td", {}, [t(this.getItem(2, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(3, 0).letter)]),
            h("td", {}, [t(this.getItem(3, 1).letter)]),
            h("td", {}, [t(this.getItem(3, 2).letter)]),
            h("td", {}, [t(this.getItem(3, 3).letter)]),
            h("td", {}, [t(this.getItem(3, 4).letter)]),
          ]),
          h("tr", {}, [
            h("td", {}, [t(this.getItem(4, 0).letter)]),
            h("td", {}, [t(this.getItem(4, 1).letter)]),
            h("td", {}, [t(this.getItem(4, 2).letter)]),
            h("td", {}, [t(this.getItem(4, 3).letter)]),
            h("td", {}, [t(this.getItem(4, 4).letter)]),
          ]),
        ]),
      ])
    );
  }

  renderOutput(container) {
    container.innerHTML = "";
    container.appendChild(h("h1", {}, [t("Output")]));
    container.appendChild(h("p", {}, t(this.Output)));
  }
}
