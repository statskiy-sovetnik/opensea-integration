const hre = require("hardhat");
const {
  suits,
  cards_to_suits,
  cards_uri_names,
  tokens_count
} = require("../utils/cardsData.js");
const baseURI = process.env.BASE_URI;
const { premintDeck } = require("../utils/premintDeck.js");
const deck_address = process.env.DECK_CONTRACT_ADDRESS;

async function premintAllTokensDeck() {
  const deckInstance = await hre.ethers.getContractAt("Deck", deck_address);
  
  await premintDeck(deck_address, deckInstance, cards_uri_names, baseURI);
  console.log("Deck is minted");
}

premintAllTokensDeck().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

