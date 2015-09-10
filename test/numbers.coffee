assert      = require 'assert'
chai        = require 'chai'
stringToNum = require('./../lib/numeric-string-parser')
numToString = require('written-number')
expect      = chai.expect

chai.should()

describe 'String Parsing', =>
  it 'parses a small numbers', =>
    expect(stringToNum('four')).to.equal(4)
    expect(stringToNum('twelve')).to.equal(12)

  # it 'parses a few large numbers', =>
  #   expect(stringToNum('twelve million six hundred and four thousand and nine')).to.equal(12604009)
  #   expect(stringToNum('five quintillion')).to.equal(5e18)

  it 'parses negative numbers', =>
    expect(stringToNum('negative four')).to.equal(-4)
    # expect(stringToNum('negative ninety three thousand one hundred and one')).to.equal(-93101)

describe 'Compatibility with the written-number library', =>
  it 'produces the same value for a wide variety of numbers', =>
    numbers = [123, 456, 789]

    for key, number of numbers
      expect(stringToNum(numToString(number))).to.equal(number)

  it 'produces the same values for 0..100', =>
    for number in [0..100]
      expect(stringToNum(numToString(number))).to.equal(number)
