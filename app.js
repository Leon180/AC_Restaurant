const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Restaurant.find().sort('name').lean().then(restaurants => {
    res.render('index', { restaurants })
  }).catch(error => console.log(error))
})

app.get('/restaurants/:id/details', (req, res) => {
  Restaurant.findOne({ restaurant_id: req.params.id }).lean().then(restaurant => {
    res.render('show', { restaurant })
  }).catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  Restaurant.find({
    $or: [
      { name: new RegExp(keyword, 'i') },
      { name_en: new RegExp(keyword, 'i') },
      { category: new RegExp(keyword, 'i') }
    ]
  }).sort('name').lean().then(restaurants => {
    console.log(restaurants)
    res.render('index', { restaurants, keyword })
  }).catch(error => console.log(error))
})

app.get('/restaurants/create', (req, res) => {
  res.render('edit', { submit_form: 'create' })
})

app.post('/restaurants/create', (req, res) => {
  Restaurant.count((err, count) => {
    if (err) {
      console.log(err)
    } else {
      Restaurant.create({
        restaurant_id: count + 1,
        name: req.body.name,
        name_en: req.body.name_en,
        category: req.body.category,
        image: req.body.image,
        location: req.body.location,
        phone: req.body.phone,
        google_map: req.body.google_map,
        rating: req.body.rating,
        description: req.body.description
      }).then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
})

app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findOne({ restaurant_id: req.params.id }).lean().then(restaurant => {
    res.render('edit', { submit_form: `${req.params.id}/edit`, restaurant })
  }).catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  return Restaurant.findOne({ restaurant_id: req.params.id })
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${req.params.id}/details`))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/delete', (req, res) => {
  return Restaurant.findOne({ restaurant_id: req.params.id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening the port ${port}...`)
})
