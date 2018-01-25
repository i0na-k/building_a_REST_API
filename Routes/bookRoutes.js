var express = require('express');

var routes = function(Book) {
  var bookRouter = express.Router();

  bookRouter.route('/Books')
    .post(function (req, res) {
      var book = new Book(req.body);
      console.log(book + '\n');
      book.save();
      res.status(201).send(book);
      console.log(book.title + ' Sent to DB');
    })

    .get(function (req, res) {
      var query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      if (req.query.title) {
        query.title = req.query.title;
      }
      Book.find(function (err, book) {
        if (err)
          res.status(500).send(err)
        else
          res.json(book);
      });
    });

  bookRouter.route('/Books/id/:bookId')
    .get(function (req, res) {
      Book.findById(req.params.bookId, function (err, book) {
        if (err)
          res.status(500).send(err);

        else
          res.json(book);
      });
    })
    .put(function (req, res) {
      Book.findById(req.params.bookId, function (err, book) {
        if (err)
          res.status(500).send(err);
        else
          book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        book.save();
        res.json(book);
      });

    });

bookRouter.route('/Books/title/:title')
  .get(function(req,res){
    Book.find({title: req.params.title}, function(err,book){
      if (err)
        res.status(500).send(err);
      else
        res.json(book);
    });
  });

bookRouter.route('/Books/year/:year')
  .get(function(req,res){
    Book.find({year:req.params.year}, function(err,book){
      if (err)
        req.status(500).send(err);
      else
        res.json(book);
    });
  });

return bookRouter;
}

module.exports = routes;