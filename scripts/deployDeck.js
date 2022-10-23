const hre = require("hardhat");

async function deployDeck() {

  const Deck = await hre.ethers.getContractFactory("Deck");
  const deck = await Deck.deploy();

  await deck.deployed();

  console.log(
    `Deck ERC721 is deployed to ${deck.address}`
  );
}


deployDeck().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
