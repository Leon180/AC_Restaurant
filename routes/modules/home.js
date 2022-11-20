const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  Restaurant.find({
    $or: [
      { name: new RegExp(keyword, 'i') },
      { name_en: new RegExp(keyword, 'i') },
      { category: new RegExp(keyword, 'i') }
    ]
  }).sort('name').lean().then(restaurants => {
    res.render('index', { restaurants, keyword })
  }).catch(error => console.log(error))
})


module.exports = router