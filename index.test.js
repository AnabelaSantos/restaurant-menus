const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Restaurant", async () => {
    // TODO - write test
    let restaurant = await Restaurant.create({
      name: "O Bitoque",
      location: "Vauxhall",
      cuisine: "Portuguese",
    });
    expect(typeof Restaurant).toBe("function");
    expect(restaurant).toHaveProperty("name", "O Bitoque");
    expect(restaurant).toHaveProperty("location", "Vauxhall");
    expect(restaurant).toHaveProperty("cuisine", "Portuguese");
  });

  test("can create a Restaurant from the seed file", async () => {
    let restaurant1 = await Restaurant.create(seedRestaurant[0]);
    let restaurant2 = await Restaurant.create(seedRestaurant[1]);
    let restaurant3 = await Restaurant.create(seedRestaurant[2]);

    expect(typeof Restaurant).toBe("function");
    expect(restaurant1).toHaveProperty("name", "AppleBees");
    expect(restaurant2).toHaveProperty("location", "Dallas");
    expect(restaurant3).toHaveProperty("cuisine", "Indian");
  });

  test("can create a Menu", async () => {
    // TODO - write test
    let menu = await Menu.create({
      title: "Mains",
    });
    expect(typeof Menu).toEqual("function");
    expect(menu).toHaveProperty("title", "Mains");
  });

  test("can create a Menu from the seed file", async () => {
    let menu1 = await Menu.create(seedMenu[0]);
    let menu2 = await Menu.create(seedMenu[1]);
    let menu3 = await Menu.create(seedMenu[2]);

    expect(typeof Restaurant).toBe("function");
    expect(menu1).toHaveProperty("title", "Breakfast");
    expect(menu2).toHaveProperty("title", "Lunch");
    expect(menu3).toHaveProperty("title", "Dinner");
  });

  test("can find Restaurants", async () => {
    // TODO - write test
    const restaurants = await Restaurant.findAll();
    expect(restaurants.length).toBe(4);
    expect(restaurants[0] instanceof Restaurant).toBeTruthy;
    console.log(restaurants.length);
    expect(restaurants[0].location).toBe("Vauxhall");
  });

  test("can find Menus", async () => {
    // TODO - write test
    const menus = await Menu.findAll();
    expect(menus.length).toEqual(4);
    expect(menus instanceof Menu).toBeTruthy;
    // console.log(menus);
    expect(menus[2].title).toBe("Lunch");
  });

  test("can delete Restaurants", async () => {
    // TODO - write test

    let newrestaurants = await Restaurant.destroy({
      where: { cuisine: "FastFood" },
    });
    const restaurants = await Restaurant.findAll();
    expect(restaurants.length).toBe(3);
    // console.log(restaurants);
  });

  test("can delete Menus", async () => {
    // TODO - write test

    let newmenuss = await Menu.destroy({
      where: { title: "Mains" },
    });
    const menus = await Menu.findAll();
    expect(menus.length).toBe(3);
    console.log(menus);
  });
});
