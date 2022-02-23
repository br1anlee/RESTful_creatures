// import packages
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');
const methodOverride = require('method-override')

// create an instance of an express
const app = express();


//middleware
// tell express to use ejs as the view engine
app.set('view engine', 'ejs')

// tell express that we're using ejs layouts
app.use(ejsLayouts)

// add the middleWare above the body-parser middleWare
app.use(methodOverride('_method'))

// body-parser middleWare = tells express how to handle incoming form data (payload data)
// this allows us to access form data vai req.body
app.use(express.urlencoded({extended: false}));


// ROUTES
// Home route
app.get('/', (req, res) => {
    res.send("This is the home screen")
})

app.use('/dinosaurs', require('./controllers/dinoController.js'))
app.use('/prehistoric_creatures', require('./controllers/creatureController.js'))
// // Index Route
// app.get('/dinosaurs', (req, res) => {
//     let dinosaurs = fs.readFileSync("./dinosaurs.json")
//     // you need to parse it to get the json data
//     let dinoData = JSON.parse(dinosaurs)
//     console.log(req.query)
//     let nameFilter = req.query.nameFilter

//     if(nameFilter){
//         // filter out all dinos who do not have the queried name
//          // returns a new array the .filter method
//         dinoData = dinoData.filter(dino => {
//             return dino.name.toLowerCase() === nameFilter.toLowerCase()
//     })
// }


//     res.render('index.ejs', {myDinos: dinoData })
// })
// // New route (renders new.ejs)
// app.get('/dinosaurs/new', (req, res) => {
//     res.render('new.ejs')
// })
// // edit form route (renders edit form)
// app.get('/dinosaurs/edit/:idx', (req, res) => {
//     let dinosaurs = fs.readFileSync("./dinosaurs.json")
//     let dinoData = JSON.parse(dinosaurs)
//     // console.log('idx: ' + req.params.idx)
//     let dinoIndex = req.params.idx
//     let targetDino = dinoData[dinoIndex]
//     // snatch the dino to be updated
//     res.render('edit.ejs', {dino: targetDino, dinoId: dinoIndex})
// })


// // PUT ROUTE
// app.put('/dinosaurs/:idx', (req, res) => {
//     // console.log("You've hit the put route for editing dino with id of " + req.params.idx)
//     // read in our existing dino data
//     let dinosaurs = fs.readFileSync("./dinosaurs.json")
//     let dinoData = JSON.parse(dinosaurs)
//     // replace dino fields with fields from form
//     dinoData[req.params.idx].name = req.body.name
//     dinoData[req.params.idx].type = req.body.type
//     // write the updated array back to the json file
//     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//     // once the dinosaur has been edited, do a get request to the index route
//     // this is the url pattern not the file
//     res.redirect('/dinosaurs')
// })
// // Show route - show all info about a single dino (URL Parameters)
// app.get('/dinosaurs/:idx', (req, res) => {
//     // read in the dinos from the database
//     // extract the dino corresponding to the idx param
//     let dinosaurs = fs.readFileSync("./dinosaurs.json")
//     let dinoData = JSON.parse(dinosaurs)
//     // console.log('idx: ' + req.params.idx)
//     let dinoIndex = req.params.idx
//     let targetDino = dinoData[dinoIndex]
//     // console.log(targetDino)
//     res.render('show.ejs', {dino: targetDino})
// })

// // post a new dino
// app.post('/dinosaurs', (req, res) => {
//     // read in our dino data from the json file
//     let dinosaurs = fs.readFileSync("./dinosaurs.json")
//     let dinoData = JSON.parse(dinosaurs)
//     // add the new dino to the dinoData array
//     dinoData.push(req.body)
//     // save the dinosaurs to the json file
//     // takes two parameters (1. where are you writing to it 2. what are you writing to it)
//     // always use JSON.stringify to get back to its original form
//     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

//     // redirect to the GET /dinosaurs route once post has been completed
//     res.redirect('/dinosaurs');
// })

// app.delete('/dinosaurs/:idx', (req, res) => {
//     console.log("You're trying to delete dino # " + req.params.idx)
//     // read in our dinos from our json file
//     let dinosaurs = fs.readFileSync("./dinosaurs.json")
//     let dinoData = JSON.parse(dinosaurs)
//     // remove the deleted dino from dinoData
//     dinoData.splice(req.params.idx, 1)
//     // write the file updated array back to the json file
//     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//     res.redirect('/dinosaurs')
// })

// // Index Route for prehistoric
// app.get('/prehistoric_creatures', (req, res) => {
//     let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
//     // you need to parse it to get the json data
//     let prehistoricData = JSON.parse(prehistoric)
//     res.render('indexCreatures.ejs', {myPrehistoric: prehistoricData })
// })
// // New route (renders new.ejs)
// app.get('/prehistoric_creatures/new', (req, res) => {
//     res.render('newCreatures.ejs')
// })

// // edit route
// app.get('/prehistoric_creatures/edit/:idx', (req, res) => {
//     let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
//     let prehistoricData = JSON.parse(prehistoric)
//     // console.log('idx: ' + req.params.idx)
//     let prehistoricIndex = req.params.idx
//     let targetCreatures = prehistoricData[prehistoricIndex]
//     // snatch the dino to be updated
//     res.render('editCreatures.ejs', {prehistoric: targetCreatures, prehistoricId: prehistoricIndex})
// })



// // Show route - show all info about a single dino (URL Parameters)
// app.get('/prehistoric_creatures/:idx', (req, res) => {
//     // read in the dinos from the database
//     // extract the dino corresponding to the idx param
//     let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
//     let prehistoricData = JSON.parse(prehistoric)
//     // console.log('idx: ' + req.params.idx)
//     let prehistoricIndex = req.params.idx
//     let targetPrehistoric = prehistoricData[prehistoricIndex]
//     // console.log(targetDino)
//     res.render('showCreatures.ejs', {myPrehistoric: targetPrehistoric})
// })

// // post a new dino
// app.post('/prehistoric_creatures', (req, res) => {
//     // read in our dino data from the json file
//     let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
//     let prehistoricData = JSON.parse(prehistoric)
//     // add the new dino to the dinoData array
//     prehistoricData.push(req.body)
//     // save the dinosaurs to the json file
//     // takes two parameters (1. where are you writing to it 2. what are you writing to it)
//     // always use JSON.stringify to get back to its original form
//     fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData));

//     // redirect to the GET /dinosaurs route once post has been completed
//     res.redirect('/prehistoric_creatures');
// })

// app.delete('/prehistoric_creatures/:idx', (req, res) => {
//     // read in our prehistoric_creatures from our json file
//     let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
//     let prehistoricData = JSON.parse(prehistoric)
//     prehistoricData.splice(req.params.idx, 1)
//     // write the file updated array back to the json file
//     fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
//     res.redirect('/prehistoric_creatures')
// })

// listen port
app.listen(8000, () => {
    console.log("server is live and running on port 8000")
})
