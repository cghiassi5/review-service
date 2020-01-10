/* class is used in writeHouses to create individual house pages */
const faker = require('faker');

class HouseGenerator {
  randomNum(min, max, places = 0) {
    return Number((Math.random() * (max - min) + min).toFixed(places));
  }

  generateCsvHeader() {
    return ['host_pic', 'host_name', 'total_rating', 'communication', 'location', 'value', 'check_in', 'accuracy', 'cleanliness'];
  }

  generateHouses(houseCount) {
    const houses = [];
    for (let i = 0; i < houseCount; i++) {
      const house = [
        faker.image.avatar(),
        faker.name.firstName(),
        this.randomNum(1, 5, 2),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
      ];
      houses.push(house);
    }
    return houses;
  }
}

module.exports = new HouseGenerator();
