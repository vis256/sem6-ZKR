const pages = ["Playfair", "BBS", "FIPS"];

let currentPage = undefined;

let currentAlgo = new Base();

function selectPage(page) {
  if (currentPage) g(`${currentPage}-btn`).classList.toggle("outline");

  if (currentPage === page) {
    currentPage = undefined;
  }
  currentPage = page;
  g(`${page}-btn`).classList.toggle("outline");
  renderAlgorithm();
}

function renderAlgorithm() {
  const screen = g("main");

  screen.innerHTML = "";

  switch (currentPage) {
    case "Playfair":
      new PlayfairEncode().render();
      new PlayfairDecode().render();
      break;

    case "BBS":
      new BBS().render();
      break;

    case "FIPS":
      new FIPS().render();
      break;

    default:
      break;
  }
}
