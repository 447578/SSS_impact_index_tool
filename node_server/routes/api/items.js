const router = require('express').Router();
const database = require('better-sqlite3')("database.db");


router.post('/', function (req, res) {
    let items = req.body.items;
    if (!items) {
        let item_name = req.body.itemname;
        let city = req.body.city;
        let score = req.body.score;
        let story = req.body.story;
        let category = req.body.category;

        let foreignCheck = database.prepare('SELECT 1 FROM cities WHERE name = ?');
        let cityCheck = foreignCheck.get(city);
        if (!cityCheck) {
            database.prepare('INSERT INTO cities VALUES (?)').run(city);
        }
        let statement = database.prepare('INSERT INTO items VALUES (?,?,?,?,?)');
        let info = statement.run(city, item_name, score, story, category);
        res.status(200).json({ response: "Successfully added item into the database." })
    }
    else {
        for (let i = 0; i < items.length; i++) {
            let foreignCheck = database.prepare('SELECT 1 FROM cities WHERE name = ?');
            let cityCheck = foreignCheck.get(items[i].city);
            if (!cityCheck) {
                database.prepare('INSERT INTO cities VALUES (?)').run(items[i].city);
            }
            try {
                database.prepare('INSERT INTO items VALUES (?,?,?,?,?)').run(items[i].city, items[i].itemname, items[i].score, items[i].story, items[i].category);
            }
            catch (err) {
                res.status(400).json({ response: "Some of the values inserted already exist and have therefore not been changed, use put instead." })
            }
        }
        res.status(200).json({ response: "Items succesfully inserted." })
    }

})

router.put('/', function (req, res) {
    let item_name = req.body.itemname;
    let city = req.body.city;
    let score = req.body.score;
    let story = req.body.story;
    let category = req.body.category;


    let cityCheck = database.prepare('SELECT FROM cities WHERE name = ?').get(city);
    if (cityCheck) {
        let statement = database.prepare("SELECT FROM items WHERE city = ? && item_name = ?");
        let result = statement.get(city, item_name);
        if (!result) {
            database.prepare('INSERT INTO items VALUES (?,?,?,?,?)').run(city, item_name, score, story, category);
            res.status(200).json({ response: "Requested item did not yet exist and has now been added." });
        }
        else{
            let update = database.prepare('UPDATE items SET score = ?, story = ?, category =? WHERE city = ? && item_name = ?');
            update.run(score, story, category, city, item_name);
            res.status(200).json({ response: "Item has been succesfully updated. "})
        }

    }
    else {
        res.status("The city you requested an update for does not exist.")
    }


})

module.exports = router;