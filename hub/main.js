const pages = ["PlayfairEncode", "PlayfairDecode"];

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
    case "PlayfairEncode":
      currentAlgo = new PlayfairEncode();
      break;

    case "PlayfairDecode":
      currentAlgo = new PlayfairDecode();
      break;

    default:
      break;
  }

  currentAlgo.render();
}
