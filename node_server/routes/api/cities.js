const router = require('express').Router();
const mysql = require('mysql');



var connection = mysql.createConnection({
    
})

router.get('/', function (req, res){
    res.status(200).json({ response: "Lekker bezig pik"})
})

module.exports = router;