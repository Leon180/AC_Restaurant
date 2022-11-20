const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const sortMethod = req.query.sort
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort || { name: 'asc' }
  const sortMethod = {
    AtoZ: { name: 'asc' },
    ZtoA: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  const sortSelecting = { [sort]: true }
  Restaurant.find({
    $or: [
      { name: new RegExp(keyword, 'i') },
      { name_en: new RegExp(keyword, 'i') },
      { category: new RegExp(keyword, 'i') }
    ]
  }).sort(sortMethod[sort]).lean().then(restaurants => {
    res.render('index', { restaurants, keyword, sortSelecting })
  }).catch(error => console.log(error))
})

module.exports = router
