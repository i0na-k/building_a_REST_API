var bookController = function(Book){
  var post = function(req, res) {
    var book = new Book(req.body);
    var author = req.body.author;

    if (!req.body.title) {
      res.status(400);
      res.send("Title is required");
    }

    if (req.body.year <=2000){
      res.status(400);
      res.send("Year is invalid");
    }

    if(author!=null) {
      var firstCharAuthor = author[0];
      if (!author.startsWith(firstCharAuthor.toUpperCase())){
        res.status(400);
        res.send("Author must begin with upper case letter");
      }
    }
    else {
      if (req.body.title === 'Match This'){
        res.send("Title is matching");
      }

    book.save();
    res.status(201);
    res.send(book);
  }
        }
  var get = function(req,res){

            var query = {};

            if(req.query.genre)
            {
                query.genre = req.query.genre;
            }
            Book.find(query, function(err,books){
                if(err)
                    res.status(500).send(err);
                else {
                  var returnBooks = [];
                  books.forEach(function (element, index, array) {
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/'
                    + newBook._id;
                    returnBooks.push(newBook);
                  })

                  res.json(returnBooks);
                }
            });
        }
  return {
    post: post,
    get: get
  }
}

module.exports = bookController;