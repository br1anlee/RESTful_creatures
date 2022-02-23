const express = require('express');
const router = express.Router();
const fs = require('fs');
const methodOverride = require('method-override')

// Index Route for prehistoric
router.get('/', (req, res) => {
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    // you need to parse it to get the json data
    let prehistoricData = JSON.parse(prehistoric)
    res.render('indexCreatures.ejs', {myPrehistoric: prehistoricData })
})
// New route (renders new.ejs)
router.get('/new', (req, res) => {
    res.render('newCreatures.ejs')
})

// edit route
router.get('/edit/:idx', (req, res) => {
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    let prehistoricData = JSON.parse(prehistoric)
    // console.log('idx: ' + req.params.idx)
    let prehistoricIndex = req.params.idx
    let targetCreatures = prehistoricData[prehistoricIndex]
    // snatch the dino to be updated
    res.render('editCreatures.ejs', {prehistoric: targetCreatures, prehistoricId: prehistoricIndex})
})

// PUT ROUTE
router.put('/:idx', (req, res) => {
    // console.log("You've hit the put route for editing dino with id of " + req.params.idx)
    // read in our existing dino data
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    let prehistoricData = JSON.parse(prehistoric)
    // replace dino fields with fields from form
    prehistoricData[req.params.idx].name = req.body.name
    prehistoricData[req.params.idx].img = req.body.img_url
    // write the updated array back to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData));
    // once the dinosaur has been edited, do a get request to the index route
    // this is the url pattern not the file
    res.redirect('/prehistoric_creatures')
})

// Show route - show all info about a single dino (URL Parameters)
router.get('/:idx', (req, res) => {
    // read in the dinos from the database
    // extract the dino corresponding to the idx param
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    let prehistoricData = JSON.parse(prehistoric)
    // console.log('idx: ' + req.params.idx)
    let prehistoricIndex = req.params.idx
    let targetPrehistoric = prehistoricData[prehistoricIndex]
    // console.log(targetDino)
    res.render('showCreatures.ejs', {myPrehistoric: targetPrehistoric})
})

// post a new dino
router.post('/', (req, res) => {
    // read in our dino data from the json file
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    let prehistoricData = JSON.parse(prehistoric)
    // add the new dino to the dinoData array
    prehistoricData.push(req.body)
    // save the dinosaurs to the json file
    // takes two parameters (1. where are you writing to it 2. what are you writing to it)
    // always use JSON.stringify to get back to its original form
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData));

    // redirect to the GET /dinosaurs route once post has been completed
    res.redirect('/prehistoric_creatures');
})

router.delete('/:idx', (req, res) => {
    // read in our prehistoric_creatures from our json file
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    let prehistoricData = JSON.parse(prehistoric)
    prehistoricData.splice(req.params.idx, 1)
    // write the file updated array back to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    res.redirect('/prehistoric_creatures')
})






module.exports = router