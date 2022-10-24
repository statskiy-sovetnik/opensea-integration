// mints all tokens for the address

module.exports = {
  premintDeck: async function (receiver, deck_contract_instance, cards_uri_names, baseURI) {
    const promises = [];

    for(let uri_name of cards_uri_names) {
      let full_uri = baseURI + uri_name;
      await deck_contract_instance.mint(receiver, full_uri);
      //promises.push(prom);
    }

    //await Promise.all(promises);
  }
}