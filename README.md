# random-revisitor
get a random revisit service

## usage
```shell
$ npm i -g random-revisitor

$ random-revisitor
http://glitch.nothingissacred.org/glitchclamp

# Also supports filtering by type
$ random-revisitor gif
http://glitch.nothingissacred.org/redblueshift
```


programmatic usage:
```js
var randomRevisitor = require('random-revisitor')

randomRevisitor(function (err, random) {
  if (err) { console.error(":'("); process.exit(1) }
  console.log('there is a service at %s', random)
})

// also filter by type
randomRevisitor('gif', function (err, random) {
  if (err) { console.error(":'("); process.exit(1) }
  console.log('there is a gif service at %s', random)
})

```

## api
###`randomRevisitor : (Function<Error, serviceUrl:String>) => void`
return a random url from a service on hub.revisit.link that is online.

###`randomRevisitor : (type, Function<Error, serviceUrl:String>) => void`
return a random url from a service on hub.revisit.link that supports `type` and is online.

## installation

    $ npm install random-revisitor


## running the tests

```shell
$ npm test
```

## contributors

- jden <jason@denizac.org>
- flet [@flettre](http://twitter.com/flettre)

## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
