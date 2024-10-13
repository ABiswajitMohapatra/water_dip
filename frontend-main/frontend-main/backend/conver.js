const csv = require("csvtojson");
const fs = require("fs");

const csvFilePath = "hotel_bookings_1000.csv";
const jsonFilePath = "src/data.json";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
    console.log("CSV to JSON conversion completed.");
  });
