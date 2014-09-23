#! /usr/bin/env node
var request = require('request')

function randomRevisitor (type, cb) {
  if(typeof type === 'function'){
    cb = type
    type = null
  }

  request.get('http://hub.revisit.link/services',{json:true}, function (err, res) {
    if (err) { return cb(err) }
    var rando = rand(
                  where(
                    res.body.services, [
                      isOnline,
                      supports(type)
                    ]
                  )
                )

    if(!rando) { return cb(new Error('No online services found' + (type ? ' that support ' + type : '')))}
    cb(null, rando.url)
  })
}

function rand (arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function where(arr, predicates) {
  return arr.filter(function (el) {
    return predicates.every(function (predicate) {
      return predicate(el)
    })
  })
}

function supports (type) {
  // if type is not specified, pass through
  if (!type) {
    return function () { return true }
  }


  if (type === 'jpg') {
    type = 'jpeg'
  }

  return function supportsType(service) {
      return type && service.supports.indexOf(type) > -1
  }

}

function isOnline (service) {
    return service.online
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
