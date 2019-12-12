const router = require('express').Router();
const database = require('better-sqlite3')("database.db");


router.post('/', function (req, res) {
    let name = req.body.name;
    let categories = req.body.categories;

    database.prepare("INSERT INTO cities(name) VALUES (?)").run(name);

    categories.foreach( element =>{
        database.prepare("INSERT INTO categories(city, category, pitfall, opportunity) VALUES (?,?,?,?)").run(name, element.name, element.pitfall, element.opportunity, element);
        element.items.foreach( item =>{
            database.prepare("INSERT INTO items(city, item_name, score, story, category) VALUES (?,?,?,?,?)").run(name, item.name, item.score, item.story, element.name);
        })
        element.steps(foreach( step =>{
            database.prepare("INSERT INTO steps(city, category, step) VALUES (?,?,?)").run(name, element.name, step);
        }))
    })

    res.status(200).json({ response: "The city of " + name + " has been succesfully inserted into the database."});

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