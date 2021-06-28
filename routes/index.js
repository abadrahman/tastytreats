const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', async function(req, res, next) {
  let data = {
    layout:  'layout.njk',
    title: 'Tasty Treats'
  }
  res.render('index.njk', data)
})

router.post('/', async function(req, res) {
  
  //Handle the submission
  let data 
  let submission = {
    "Name": req.body.name,
    "Email": req.body.email,
    "Message": req.body.message,
    "Subscribe": req.body.subscribe,
  }

  fs.writeFile(__dirname + '/../data/submissions.txt', JSON.stringify(submission)+"\n", { flag: 'a' }, err => {
    
    if (err) {
      console.error(err)
      data = {
        layout:  'layout.njk',
        title: 'Tasty Treats',
        error: 'Oops!! An error has occured. Please contact support at support@tastytreats.com'
      }
      res.render('index.njk', data)
      return
    }

    data = {
      layout:  'layout.njk',
      title: 'Thank you',
      message: 'We have received your submission and will be in touch shortly.'
    }
      
    res.render('thankyou.njk', data)
    
  })


})

module.exports = router
