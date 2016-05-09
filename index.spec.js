'use strict'
const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect

const mos = require('mos-processor')
const toc = require('.')

describe('mos-plugin-toc', () => {
  it('should create TOC', done => {
    mos({
      content: [
        '## TOC',
        '',
        '## Foo',
        '',
        '### Bar',
        '',
        '## Qar',
      ].join('\n'),
    }, [toc])
      .then(processor => processor.process())
      .then(result => {
        expect(result).to.eq([
          '## TOC',
          '',
          '- [Foo](#foo)',
          '  - [Bar](#bar)',
          '- [Qar](#qar)',
          '',
          '## Foo',
          '',
          '### Bar',
          '',
          '## Qar',
          '',
        ].join('\n'))
        done()
      })
      .catch(done)
  })
})
