const router = require('express').Router();
const database = require('better-sqlite3')("database.db");

router.get('/', function (req, res) {
    let stmt = database.prepare('SELECT * FROM cities');
    let cities = stmt.all();
    let response = [];
    for (let i = 0; i < cities.length; i++) {
        let categories = database.prepare('SELECT * FROM categories WHERE city = ? ORDER BY category').all(cities[i].name);
        let categoriesOut = [];
        for(let j = 0; j < categories; j++){
            let steps = [];
            stepsQuery = database.prepare('SELECT * FROM steps WHERE city = ? AND category = ?').all(cities[i].name, categories[j].category);
            stepsQuery.forEach(element => {
                steps.push(element.step);
            });
            let items = [];
            itemsQuery = database.prepare('SELECT * FROM items WHERE city = ? AND category = ?').all(cities[i].name, categories[j].category);
            itemsQuery.forEach(element =>{
                items.push({name: element.item_name,
                            score: element.score,
                            story: element.story})
            })
            let category = {
                name: categories[j].category,
                pitfall: categories[j].pitfall,
                opportunity: categories[j].opportunity,
                items: items,
                steps: steps
            }

            categoriesOut.push(category)
        }


        let city = {
            name: cities[i].name,
            categories: categoriesOut
        };
        response.push(city);
    }
    if (response.length < 1) {
        res.status(404).json({ response: "There are no cities registered" });
    }
    else {
        res.status(200).json({ response: response });
    }
})


router.post('/:cityname', function (req, res) {
    let cityname = req.params.cityname;
    let stmt = database.prepare('SELECT * FROM cities WHERE name = ?');
    let response = stmt.get(cityname);
    if (!response) {
        stmt = database.prepare('INSERT INTO cities (name) VALUES (?)').run(cityname);
        res.status(200).json({ response: "The city of " + cityname + " has been inserted into the database." })
    }
    else {
        res.status(400).json({ response: "That city already exists." });
    }
})

router.delete('/:cityname', function (req, res) {
    let cityname = req.params.cityname;
    let stmt = database.prepare('SELECT * FROM cities WHERE name = ?');
    let response = stmt.get(cityname);
    if (!response) {
        res.status(400).json({ response: "The city of " + cityname + " does not exist." })
    }
    else {
        stmt = database.prepare('DELETE FROM cities WHERE name = ?').run(cityname);
        stmt = database.prepare('DELETE FROM items WHERE city = ?').run(cityname);
        stmt = database.prepare('DELETE FROM categories WHERE city = ?').run(cityname);
        stmt = database.prepare('DELETE FROM steps WHERE city = ?').run(cityname);
        res.status(200).json({ response: "The city of " + cityname + " has been deleted." });
    }
})

module.exports = router;