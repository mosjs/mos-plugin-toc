const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const path = require('path')
const fs = require('fs')
const ROOT = path.resolve(__dirname, '../test/fixtures')
const fixtures = fs.readdirSync(ROOT).filter(filepath => filepath.indexOf('.') !== 0)

const mos = require('mos-processor')
import toc from './index'

describe('mos-plugin-toc', () => {
  fixtures.forEach(fixture => {
    const filepath = path.join(ROOT, fixture)
    const output = fs.readFileSync(path.join(filepath, 'output.md'), 'utf-8')
    const input = fs.readFileSync(path.join(filepath, 'input.md'), 'utf-8')
    const configPath = path.join(filepath, 'config.json')
    const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf-8')) : {}

    it('should pass fixture in dir ' + filepath, done => {
      mos({ content: input }, [{ register: toc, options: config }])
        .then(processor => processor.process())
        .then(result => {
          expect(result).to.eq(output)
          done()
        })
        .catch(done)
    })
  })
})
