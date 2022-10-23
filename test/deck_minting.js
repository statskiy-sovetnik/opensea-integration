const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");
const fetch = require("node-fetch");
  
let deckInstance;
let owner;
const baseURI = process.env.BASE_URI;
const suits = ["Diamonds", "Spades", "Joker", "Hearts"];
const cards_to_suits = {
  "ace_diamonds.json": suits[0], 
  "jack_spades.json": suits[1], 
  "joker.json": suits[2], 
  "king_diamonds.json": suits[0], 
  "king_hearts.json": suits[3], 
  "queen_diamonds.json": suits[0]
};
const cards_uri_names = Object.keys(cards_to_suits);
const tokens_count = 6;


async function deployDeck() {
  const [owner] = await ethers.getSigners();

  const Deck = await ethers.getContractFactory("Deck");
  const deck = await Deck.deploy();
  await deck.deployed();
  const owner_address = await owner.getAddress();

  console.log(
    `Deck ERC721 is deployed to ${deck.address} with owner at ${owner_address}`
  );

  return await ethers.getContractAt("Deck", deck.address);
}

describe("Deck", async function () {

  before(async function () {
    deckInstance = await deployDeck();
    [owner] = await ethers.getSigners();
  });  

  describe('Minting', async function () {
    it("Should mint all tokens to the owner", async function () {
      const owner_address = await owner.getAddress();
      const promises = [];

      expect(cards_uri_names.length).to.equal(tokens_count, "URI array length is not equal to number of tokens");

      for(let uri_name of cards_uri_names) {
        let full_uri = baseURI + uri_name;
        let prom = deckInstance.mint(owner_address, full_uri);
        promises.push(prom);
      }

      await Promise.all(promises);

      // Check that the owner posesses all tokens
      const owner_balance = (await deckInstance.balanceOf(owner_address)).toNumber();
      expect(owner_balance).to.equal(tokens_count, "Incorrect token balance of the owner");
    });

    it("Tokens have correct uri", async function () {
      /* Check Metadata responses
       */
      const promises = [];
      const expected_suits = [];

      for(let uri_name of cards_uri_names) {
        let full_uri = baseURI + uri_name;
        let prom = fetch(full_uri);
        promises.push(prom);
        expected_suits.push(cards_to_suits[uri_name]);
      }

      const responses = await Promise.all(promises);
      
      for(let i = 0; i < responses.length; i++) {
        // parse response
        const response = responses[i];
        const metadata = await response.json();
        const suit = metadata.attributes.find(attr => attr.attribute === "Suit").value;

        expect(suit).to.equal(expected_suits[i], `Card suit is incorrect: ${metadata.name}`);
      }
    });
  });

  /* describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await ethers.provider.getBalance(lock.address)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const Lock = await ethers.getContractFactory("Lock");
      await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  }); */
});
  
