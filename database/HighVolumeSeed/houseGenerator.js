const faker = require('faker');

class HouseGenerator {
  randomNum (min, max, places = 0){
    return Number((Math.random() * (max - min) + min).toFixed(places));
  }
  generateCsvHeader() {
    return ['house_id', 'host_name_pic', 'total_rating', 'total_rating_categories','Communication', 'Location',
  'Value','Check-in','Accuracy', 'Cleanliness'];
  }

  generateHouses(houseCount) {
    let houses = [];
    for (let i = 0; i < houseCount; i++) {
      let house = [
        i,
        faker.name.firstName(),
        this.randomNum(1, 5, 2),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1)
      ];
      houses.push(house);
    }
    return houses;
  }
};

module.exports = new HouseGenerator()