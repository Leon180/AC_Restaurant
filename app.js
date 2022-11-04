const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

const restaurantList = require('./restaurant.json')
const mapRestaurantList = {}
restaurantList.results.forEach(restaurant => {
  mapRestaurantList[restaurant.id] = restaurant
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: mapRestaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = mapRestaurantList[req.params.id]
  console.log(restaurant)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filterRestaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: filterRestaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening the port ${port}...`)
})