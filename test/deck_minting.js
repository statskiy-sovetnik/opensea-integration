const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");
const fetch = require("node-fetch");
const { premintDeck } = require("../utils/premintDeck.js");
const {
  suits,
  cards_to_suits,
  cards_uri_names,
  tokens_count
} = require("../utils/cardsData.js");
  
let deckInstance;
let owner;
const baseURI = process.env.BASE_URI;



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
    it("Should mint all tokens to the contract", async function () {
      //const owner_address = await owner.getAddress();
      const deck_address = deckInstance.address;

      expect(cards_uri_names.length).to.equal(tokens_count, "URI array length is not equal to number of tokens");

      //Mint tokens to the deck contract itself
      await premintDeck(deck_address, deckInstance, cards_uri_names, baseURI);

      // Check that the owner posesses all tokens
      const deck_balance = (await deckInstance.balanceOf(deck_address)).toNumber();
      expect(deck_balance).to.equal(tokens_count, "Incorrect token balance of the owner");
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
});
  
