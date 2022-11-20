// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Restaurant = require('../../models/restaurant')

// New
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  return Restaurant.create({
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
})

// Detail
router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  Restaurant
    .findById(restaurantId)
    .lean()
    .then(restaurant => {
      res.render('show', { restaurant })
    }).catch(error => console.log(error))
})

// Edit
router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  Restaurant
    .findById(restaurantId)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    }).catch(error => console.log(error))
})

router.put('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant
    .findById(restaurantId)
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
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant
    .findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router