const Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const flightSearch = async (req, res) => {
  try {
    const data = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: "BOS",
      destinationLocationCode: "LON",
      departureDate: "2024-12-05",
      adults: "2",
    });
    res.send(data.data);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

module.exports = { flightSearch };
