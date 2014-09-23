
var sinon = require('sinon'),
    request = require('request')

var should = require('mochi').should(),
    res = {body: {services: []}}

sinon.stub(request, 'get').yields(null, res)

describe('random-revisitor', function () {
  var randomRevisitor = require('../')

  it('returns url when successful', function () {
      res.body.services = [
        {url: 'someurl', supports: ['gif'],online: true}
      ]

      randomRevisitor(function(er, svc){
          should.not.exist(er)
          svc.should.be.string('someurl')
      })
    })

  it('returns url when successful while passing type', function () {
    res.body.services = [
      {url: 'someurl', supports: ['png','gif'],online: true},
      {url: 'otherurl', supports: ['png'],online: true}
    ]

    randomRevisitor('gif', function (er, svc){
        should.not.exist(er)
        svc.should.be.string('someurl')
    })
  })

  it('returns url of jpeg service when passing type jpg', function () {
    res.body.services = [
      {url: 'goodjpegservice', supports: ['jpeg'],online: true},
      {url: 'badsupports', supports: ['jpg'],online: true}
    ]

    randomRevisitor('jpg', function (er, svc){
      should.not.exist(er)
      svc.should.be.string('goodjpegservice')
    })
  })

  it('returns url of a service when passing type null', function () {
    res.body.services = [
      {url: 'someservice', supports: ['jpeg'],online: true}
    ]

    randomRevisitor(null, function (er, svc){
      should.not.exist(er)
      svc.should.be.string('someservice')
    })
  })

  it('throws error when bad type filters all results', function () {

    res.body.services = [
      {url: 'foo', supports: ['gif'],online: true}
    ]

    randomRevisitor('nope', function (er) {
        should.exist(er)
        er.message.should.be.string('No online services found that support nope')
    })
  })

  it('throws error when no services online', function () {
    res.body.services = [
      {url: 'foo', supports: ['gif'],online: false}
    ]

    randomRevisitor(function(er){
        should.exist(er)
        er.message.should.be.string('No online services found')
    })
  })

  it('throws error when no online services available for type ', function () {
    res.body.services = [
      {url: 'foo', supports: ['gif'],online: false},
      {url: 'foo', supports: ['png'],online: true}
    ]

    randomRevisitor('gif', function (er) {
        should.exist(er)
        er.message.should.be.string('No online services found')
    })
  })

  it('returns error when request fails', function () {
    request.get.restore()
    sinon.stub(request, 'get').yields(new Error('something went wrong'))

    randomRevisitor(function (er){
      should.exist(er)
      er.message.should.be.string('something went wrong')
    })
  })

})
