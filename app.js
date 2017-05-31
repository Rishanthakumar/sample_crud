// Define the the node app by requiring express.
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require the book model.
var Book = require('./model/book.model');

var db = 'mongodb://localhost:27017/example';
var port = 8080;
mongoose.connect(db);

// Used for post requests to get the values from the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Starting root.
app.get('/', function(req, res) {
   res.send('Happy to be here');
});

// Listing all books
app.get('/books', function(req, res) {
   console.log('Getting all books');
   Book.find({})
       .exec(function (err, books) {
      if(err) {
         res.send('error has occured');
      } else {
         console.log(books);
         res.json(books);
      }
    });
});

// Listing specific books
app.get('/books/:id', function(req, res){
   console.log('Getting one book');
   Book.findOne({
      _id: req.params.id
   }).exec(function(err, book) {
      if(err) {
         res.send('error occured');
      } else {
         console.log(book);
         res.json(book);
      }
   });
});

// Adding a book
app.post('/book', function(req, res) {
   var newBook = new Book();

   newBook.title = req.body.title;
   newBook.author = req.body.author;
   newBook.category = req.body.category;

   newBook.save(function(err, book) {
      if(err) {
         res.send('error saving the book');
      } else {
         console.log(book);
         res.send(book);
      }
   });
});

// Adding book method 2
app.post('/book2', function(req, res) {
   Book.create(req.body, function(err, book) {
      if(err) {
         res.send('error saving the book');
      } else {
         console.log(book);
         res.send(book);
      }
   });
});

// Updating one entry
app.put('/book/:id', function(req, res) {
   Book.findOneAndUpdate({
      _id: req.params.id
   }, {$set: {title: req.body.title}},
       {upset: true},
       function(err, newBook) {
         if(err) {
            console.log('error occured');
         } else {
            console.log(newBook);
             //TODO: res.status not working need to check.
            //res.status(204);
            res.send(newBook)
         }
       }
   );
});

// Deleting a Book
app.delete('/book/:id', function(req, res) {

   Book.findOneAndRemove({
      _id: req.params.id
   }, function(err, book) {
      if(err) {
         res.send('error deleting');
      } else {
         console.log(book);
         //TODO: res.status not working need to check.
         res.status(204).send('Some error occured');
      }
   });
});

// Starting the server/
app.listen(port, function () {
   console.log('app listening on port ' + port);
});