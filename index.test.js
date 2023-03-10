const { sequelize } = require("./db");
const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");

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
      rating: 10,
    });
    expect(typeof Restaurant).toBe("function");
    expect(restaurant).toHaveProperty("name", "O Bitoque");
    expect(restaurant).toHaveProperty("location", "Vauxhall");
    expect(restaurant).toHaveProperty("cuisine", "Portuguese");
    expect(restaurant).toHaveProperty("rating", 10);
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

  test("can create an Item", async () => {
    // TODO - write test
    let item = await Item.create({
      name: "Bitoque",
      image: "someimage.jpg",
      price: 20,
      vegetarian: false,
    });
    expect(typeof Item).toBe("function");
    expect(item).toHaveProperty("name", "Bitoque");
    expect(item).toHaveProperty("image", "someimage.jpg");
    expect(item).toHaveProperty("price", 20);
    expect(item).toHaveProperty("vegetarian", false);
  });

  test("can create an Item from the seed file", async () => {
    let item1 = await Item.create(seedItem[0]);
    let item2 = await Item.create(seedItem[1]);
    let item3 = await Item.create(seedItem[2]);

    expect(typeof Restaurant).toBe("function");
    expect(item1).toHaveProperty("name", "bhindi masala");
    expect(item2).toHaveProperty("price", 10.5);
    expect(item3).toHaveProperty("vegetarian", false);
  });

  test("can find Restaurants", async () => {
    // TODO - write test
    const restaurants = await Restaurant.findAll();
    expect(restaurants.length).toBe(4);
    expect(restaurants[0] instanceof Restaurant).toBeTruthy;
    // console.log(restaurants.length);
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
    // console.log(menus);
  });
});

//Part 2
describe("Restaurant and Menu Models Association", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("If a Restaurant can have many Menus", async () => {
    //Create Restaurant and Menus
    let restaurant = await Restaurant.create({
      name: "O Bitoque",
      location: "Vauxhall",
      cuisine: "Portuguese",
      rating: 10,
    });
    let menu1 = await Menu.create(seedMenu[0]);
    let menu2 = await Menu.create(seedMenu[1]);
    let menu3 = await Menu.create(seedMenu[2]);
    // create some associations - put musicians in bands
    await restaurant.addMenu(menu1);
    await restaurant.addMenu(menu2);
    await restaurant.addMenu(menu3);

    // test the association
    const restaurantMenus = await restaurant.getMenus();
    expect(restaurantMenus.length).toBe(3);
    expect(restaurantMenus[0] instanceof Menu).toBeTruthy;
    expect(restaurantMenus[0].title).toBe("Breakfast");
  });
});

// Part 3

describe("Menu and Item Models Association", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("If a Menu can have many Items and if an Item can be in many Menus", async () => {
    // create Menus and Items
    //Populate the DB with a Menu and some Items
    let menu1 = await Menu.create(seedMenu[0]);
    let menu2 = await Menu.create(seedMenu[1]);
    let menu3 = await Menu.create(seedMenu[2]);
    let item1 = await Item.create(seedItem[0]);
    let item2 = await Item.create(seedItem[1]);
    let item3 = await Item.create(seedItem[2]);

    // create some associations - put items in a menu
    await menu1.addItems([item1, item2]);
    await menu2.addItems([item1, item2]);
    // create some associations - have the same item in different menus
    await item1.addMenus([menu1, menu2]);
    await item2.addMenus([menu1, menu2]);

    // test the association
    const menu1Items = await menu1.getItems();
    expect(menu1Items.length).toBe(2);
    expect(menu1Items[0] instanceof Item).toBeTruthy;
    expect(menu1Items[0]).toHaveProperty("name", "bhindi masala");

    const menu2Items = await menu2.getItems();
    expect(menu2Items.length).toBe(2);
    expect(menu2Items[0] instanceof Item).toBeTruthy;
    expect(menu2Items[1]).toHaveProperty("price", 10.5);

    const item1Menus = await item1.getMenus();
    expect(item1Menus.length).toBe(2);
    expect(item1Menus[0] instanceof Menu).toBeTruthy;
    console.log(item1Menus);
    expect(item1Menus[0]).toHaveProperty("title", "Breakfast");

    const item2Menus = await item2.getMenus();
    expect(item2Menus.length).toBe(2);
    expect(item2Menus[0] instanceof Menu).toBeTruthy;
    expect(item2Menus[1]).toHaveProperty("title", "Lunch");
  });
});
