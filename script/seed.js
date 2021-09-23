'use strict'

const {db, models: {User, Product, Orders, OrderDetails} } = require('../server/db');
const productSeed = require('../seed-data-products.json');
const userSeed = require('../seed-data-users.json');
const orderSeed = require('../seed-data-orders.json')
const detailsSeed = require('../seed-data-orderdetails.json')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  const users = await Promise.all(userSeed.map((user) => User.create(user)));
  const products = await Promise.all(productSeed.map((product) => Product.create(product)));
  const orders = await Promise.all(orderSeed.map((order) => Orders.create(order)));
  const orderDetails = await Promise.all(detailsSeed.map((detail) => OrderDetails.create(detail)));
  console.log('db synced!')

  // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderDetails.length} order details`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
