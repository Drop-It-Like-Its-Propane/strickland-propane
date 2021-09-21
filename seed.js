// const {db, Item } = require('./server/db');
// const seedData = require('./seed-data.json');

// (async function seedDatabase(){
//     try {
//         await db.sync({force: true});
//         await Promise.all(seedData.map((item) => Item.create(item)));
//         console.log("Seed success!");
//     } catch (error) {
//         console.error(error);
//     }
//     db.close();
// }) ();