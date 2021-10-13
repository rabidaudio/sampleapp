const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.render('index', {
    name: req.query.name || 'world'
  })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
