const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

var db ;

MongoClient.connect('mongodb://172.17.0.2:27017/admin', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('the server is listening on port 3000')
  })
});

app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('index.ejs', {books: result})
  })
});

app.post('/books', (req, res) => {
  db.collection('books').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
});

app.put('/books', (req, res) => {
  db.collection('books')
  .findOneAndUpdate(
    {
      tittle: req.body.tittle,
      author: req.body.author
    }, 
    { 
      $set: {
        price: req.body.price
      }
    }, 
    {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/books', (req, res) => {
  db.collection('books').findOneAndDelete({tittle: req.body.tittle,author: req.body.author},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'The book has been disposed. With honor'})
  })
})