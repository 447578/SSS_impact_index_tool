const router = require('express').Router();
const database = require('better-sqlite3')("database.db");


router.post('/', function (req,res){
    let items = req.body.items;
    if(!items){
        let item_name = req.body.itemname;
        let city = req.body.city;
        let score = req.body.score;
        let story = req.body.story;
        let category = req.body.category;

        database.prepare('INSER INTO items VALUES (?,?,?,?,?)').run(city, item_name, score, story, category);
        res.status(200).json({ resonse: "Successfully added item into the database."})
    }
    else{
        for(let i = 0; i < items.length; i++){
            database.prepare('INSERT INTO items VALUES (?,?,?,?,?)').run(items[i].city, items[i].itemname, items[i].score, items[i].story, items[i].category);
        }
        res.status(200).json({ response: "Items succesfully inserted."})
    }
})

module.exports = router;