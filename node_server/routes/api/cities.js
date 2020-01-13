const router = require('express').Router();
const database = require('better-sqlite3')("database.db");


function getAllCities() {
    return new Promise(function getCities(resolve) {
        let stmt = database.prepare('SELECT * FROM cities');
        let cities = stmt.all();
        let response = [];
        for (let i = 0; i < cities.length; i++) {
            let categories = database.prepare('SELECT * FROM categories WHERE city = ? ORDER BY category').all(cities[i].name);
            let categoriesOut = [];
            for (let j = 0; j < categories.length; j++) {
                let steps = [];
                stepsQuery = database.prepare('SELECT * FROM steps WHERE city = ? AND category = ?').all(cities[i].name, categories[j].category);
                for (let x = 0; x < stepsQuery.length; x++) {
                    steps.push(stepsQuery[x].step);
                }
                let items = [];
                itemsQuery = database.prepare('SELECT * FROM items WHERE city = ? AND category = ?').all(cities[i].name, categories[j].category);
                for (let x = 0; x < itemsQuery.length; x++) {
                    items.push({
                        name: itemsQuery[x].item_name,
                        score: itemsQuery[x].score,
                        story: itemsQuery[x].story
                    })
                }
                let category = {
                    name: categories[j].category,
                    description: categories[j].description,
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
            resolve(response)
        }
    }
    )


}

router.get('/', function (req, res) {
    getAllCities().then(function (fulfilled) {
        if (fulfilled.length < 1) {
            res.status(404).json({ response: "There are no cities registered" });
        }
        else {
            res.status(200).json({ response: fulfilled });
        }


    })
})

router.post('/', function (req, res) {
    let cityname = req.body.name;
    let categories = req.body.categories;

    database.prepare('INSERT INTO cities VALUES (?)').run(cityname);

    for(const category of categories){
        database.prepare('INSERT INTO categories VALUES (?,?,?,?,?)').run(cityname, category.name, category.description, category.pitfall, category.opportunity);
        for(const item of category.items){
            database.prepare('INSERT INTO items VALUES (?,?,?,?,?)').run(cityname, item.name, item.score, item.story, category.name)
        }
        for(const step of category.steps){
            database.prepare('INSERT INTO steps VALUES (?,?,?)').run(cityname, category.name, step);
        }
    }
    res.status(200).json({ response: cityname + " has been successfully inserted."})
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