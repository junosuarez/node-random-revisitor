#! /usr/bin/env node
var request = require('request')

function randomRevisitor (type, cb) {
  if(typeof type === 'function'){
    cb = type
    type = null
  }

  request.get('http://hub.revisit.link/services',{json:true}, function (err, res) {
    if (err) { return cb(err) }
    var rando = rand(res.body.services, type)
    if(!rando) { return cb(new Error('No online services found' + (type ? ' that support ' + type : '')))}
    cb(null, rando.url)
  })
}

function rand (arr, type) {
  if(type) {arr = filterByType(arr, type)}
  arr = arr.filter(onlineOnly)
  return arr[Math.floor(Math.random()*arr.length)]
}

function filterByType (arr, type) {
  if(type === 'jpg'){type='jpeg'}
  function supportsType(svc) {
      return svc.supports.indexOf(type) > -1
  }
  return arr.filter(supportsType)
}

function onlineOnly (svc) {
    return svc.online
}

module.exports = randomRevisitor

if (!module.parent) {
  randomRevisitor(process.argv[2], function (er, url) {
    if (er) {
      console.error(er)
      process.exit(1)
    }
    console.log(url)
  })
}
