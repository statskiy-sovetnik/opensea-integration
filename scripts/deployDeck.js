const hre = require("hardhat");

async function deployDeck() {
  const [owner] = await hre.ethers.getSigners();
  const Deck = await hre.ethers.getContractFactory("Deck");
  const deck = await Deck.deploy();
  const owner_address = await owner.getAddress();

  await deck.deployed();

  console.log(
    `Deck ERC721 is deployed to ${deck.address} by ${owner_address}`
  );
}


deployDeck().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
