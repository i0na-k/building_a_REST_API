var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests', function(){
  describe('Post', function(){
    it('should not allow an empty title on post',function(){
      var Book = function(book){this.save = function(){}};
      var req = {
        body: {
          author: 'Test'
        }
      }
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req,res);
      res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
      res.send.calledWith("Title is required").should.equal(true);
    })
  })
  describe('Title validation', function(){
    it('should match title', function(){
      var Book = function(book){this.save = function(){}};
      var req = {
        body: {
          title: 'Match This'
        }

      }
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }
      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req,res);
      res.status.calledWith(201).should.equal(true, 'Data sent correctly' + res.status.args[0][0]);
      res.send.calledWith("Title is matching").should.equal(true);
    })
  })

  describe('Year should be greater than 2000', function(){
    it('year should be greater than 2000', function(){
      var Book = function(book){this.save = function(){}};
      var req = {
        body: {
          year: 1999
        }

      }
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }
      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req,res);
      res.status.calledWith(400).should.equal(true, 'Bad Request' + res.status.args[0][0]);
      res.send.calledWith("Year is invalid").should.equal(true);
    })
  })

  describe('Author must begin with a capital letter', function(){
    it('Ensure capital letter for author parameter', function(){
      var Book = function(book){this.save = function(){}};
      var req = {
        body: {
          author: 'tthis_will_fail'
        }

      }
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }
      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req,res);
      res.status.calledWith(400).should.equal(true, 'Bad Request' + res.status.args[0][0]);
      res.send.calledWith("Author must begin with upper case letter").should.equal(true);
    })
  })


})