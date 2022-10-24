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

module.exports = {
    suits,
    cards_to_suits,
    cards_uri_names,
    tokens_count
}