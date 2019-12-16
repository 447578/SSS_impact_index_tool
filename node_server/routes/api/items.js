const router = require('express').Router();
const database = require('better-sqlite3')("database.db");

router.put('/', function (req, res) {
    let item_name = req.body.itemname;
    let city = req.body.city;
    let score = req.body.score;
    let story = req.body.story;
    let category = req.body.category;


    let cityCheck = database.prepare('SELECT 1 FROM cities WHERE name = ?').get(city);
    if (cityCheck) {
        let statement = database.prepare("SELECT 1 FROM items WHERE city = ? AND item_name = ?");
        let result = statement.get(city, item_name);
        if (!result) {
            database.prepare('INSERT INTO items VALUES (?,?,?,?,?)').run(city, item_name, score, story, category);
            res.status(200).json({ response: "Requested item did not yet exist and has now been added." });
        }
        else{
            let update = database.prepare('UPDATE items SET score = ?, story = ?, category =? WHERE city = ? AND item_name = ?');
            update.run(score, story, category, city, item_name);
            res.status(200).json({ response: "Item has been succesfully updated. "})
        }

    }
    else {
        res.status("The city you requested an update for does not exist.")
    }


})

module.exports = router;