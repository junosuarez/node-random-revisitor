#! /usr/bin/env node
var request = require('request')

function randomRevisitor (cb) {
  request.get('http://hub.revisit.link/services',{json:true}, function (err, res) {
    if (err) { return cb(err) }
    cb(null, rand(res.body.services).url)
  })  
}

function rand(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

module.exports = randomRevisitor

if (!module.parent) {
  randomRevisitor(function (er, url) {
    if (er) {
      console.error(er)
      process.exit(1)
    }
    console.log(url)
  })
}