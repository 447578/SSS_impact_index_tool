const router = require('express').Router();
const database = require('better-sqlite3')("database.db");

router.get('/', function (req, res) {
    let stmt = database.prepare('SELECT * FROM cities');
    let cities = stmt.all();
    let response = [];
    for (let i = 0; i < cities.length; i++) {
        stmt = database.prepare('SELECT * FROM items WHERE city = ? ORDER BY category');
        let answer = stmt.all(cities[i].name);
        let city = {
            name: cities[i].name,
            items: answer
        };
        response.push(city);
    }
    res.status(200).json({ response: response});
})


router.post('/:cityname', function(req,res){
    let cityname = req.params.cityname;
    let stmt = database.prepare('SELECT * FROM cities WHERE name = ?');
    let response = stmt.get(cityname);
    if(!response){
        stmt = database.prepare('INSERT INTO cities (name) VALUES (?)').run(cityname);
        res.status(200).json({ response: "The city of " + cityname + " has been inserted into the database."})
    }
    else{
        res.status(400).json({ response: "That city already exists."});
    }
})

router.delete('/:cityname', function(req,res){
    let cityname = req.params.cityname;
    let stmt = database.prepare('SELECT * FROM cities WHERE name = ?');
    let response = stmt.get(cityname);
    if(!response){
        res.status(400).json({ response: "The city of " + cityname + " does not exist."})
    }
    else{
        stmt = database.prepare('DELETE FROM cities WHERE name = ?').run(cityname);
        stmt = database.prepare('DELETE FROM items WHERE city = ?').run(cityname);
        res.status(200).json({ response: "The city of " + cityname + " has been deleted."});
    }
})

module.exports = router;