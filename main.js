const pages = ["Playfair", "BBS", "RSA", "DH", "Shamir", "Stego"];

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
      new FIPS().render();
      break;

    case "RSA":
      new RSAKey().render();
      new RSAEncode().render();
      new RSADecode().render();
      break;

    case "DH":
      new DH().render();
      break;

    case "Shamir":
      new Shamir().render();

    case "Stego":
      new Stego().render();
      break;

    default:
      break;
  }
}

function modPow(base, exponent, modulus) {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  return result;
}
