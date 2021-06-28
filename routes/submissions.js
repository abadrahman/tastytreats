const express = require('express')
const router = express.Router()
const fs = require('fs')
const readline = require('readline')


router.get('/', async function(req, res, next) {
  
  let submissions = [];
  let lines = [];

  const rl = readline.createInterface({
      input: fs.createReadStream(__dirname + '/../data/submissions.txt'),
      output: process.stdout,
      console: false
  });

  rl.on('line', function(line) {
    lines.unshift(JSON.parse(line) );
  }).on('close', () => {
    // Do what you need to do with lines here
      let data = {
        layout:  'layout.njk',
        title: 'Tasty Treats',
        data: lines
      }

    res.render('submissions.njk', data)

  });  

})

module.exports = router
