const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// routes
const routes = require('./routes/index')
const usePassport = require('./config/passport')
require('./config/mongoose')

// port
const port = process.env.PORT || 3000

// app setting
const app = express()
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  // helper
  helpers: {
    selected: (sortSelecting) => {
      if (sortSelecting) return "selected"
    }
  }
}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, //當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡
  saveUninitialized: true //強制將未初始化的 session 存回 session store
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening the port ${port}...`)
})
