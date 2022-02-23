const express = require('express');
const router = express.Router();
const fs = require('fs');
const methodOverride = require('method-override')


// Index Route
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    // you need to parse it to get the json data
    let dinoData = JSON.parse(dinosaurs)
    console.log(req.query)
    let nameFilter = req.query.nameFilter

    if(nameFilter){
        // filter out all dinos who do not have the queried name
         // returns a new array the .filter method
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
    })
}


    res.render('index.ejs', {myDinos: dinoData })
})
// New route (renders new.ejs)
router.get('/new', (req, res) => {
    res.render('new.ejs')
})
// edit form route (renders edit form)
router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // console.log('idx: ' + req.params.idx)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    // snatch the dino to be updated
    res.render('edit.ejs', {dino: targetDino, dinoId: dinoIndex})
})


// PUT ROUTE
router.put('/:idx', (req, res) => {
    // console.log("You've hit the put route for editing dino with id of " + req.params.idx)
    // read in our existing dino data
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // replace dino fields with fields from form
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    // write the updated array back to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // once the dinosaur has been edited, do a get request to the index route
    // this is the url pattern not the file
    res.redirect('/dinosaurs')
})
// Show route - show all info about a single dino (URL Parameters)
router.get('/:idx', (req, res) => {
    // read in the dinos from the database
    // extract the dino corresponding to the idx param
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // console.log('idx: ' + req.params.idx)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    // console.log(targetDino)
    res.render('views/show.ejs', {dino: targetDino})
})

// post a new dino
router.post('/', (req, res) => {
    // read in our dino data from the json file
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // add the new dino to the dinoData array
    dinoData.push(req.body)
    // save the dinosaurs to the json file
    // takes two parameters (1. where are you writing to it 2. what are you writing to it)
    // always use JSON.stringify to get back to its original form
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

    // redirect to the GET /dinosaurs route once post has been completed
    res.redirect('/dinosaurs');
})

router.delete('/:idx', (req, res) => {
    console.log("You're trying to delete dino # " + req.params.idx)
    // read in our dinos from our json file
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // remove the deleted dino from dinoData
    dinoData.splice(req.params.idx, 1)
    // write the file updated array back to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})


module.exports = router