# random-revisitor
get a random revisit service

## usage
```shell
$ npm i -g random-revisitor

$ random-revisitor
http://glitch.nothingissacred.org/glitchclamp
```

programmatic usage:
```js
var randomRevisitor = require('random-revisitor')

randomRevisitor(function (err, random) {
  if (err) { console.error(":'("); process.exit(1) }
  console.log('there is a service at %s", random)
})
```

## api
###`randomRevisitor : (Function<Error, serviceUrl:String>) => void`
return a random url from a service on hub.revisit.link

## installation

    $ npm install random-revisitor


## running the tests

lol


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
