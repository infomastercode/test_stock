const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3001;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./helpers/activity_helper');
require('./helpers/sqltext_helper');
require('./helpers/logger_helper');

global.PATH_ROOT = __dirname;
global.APPNAME = "/inventory/v2";

// V1
// var productRouter = require('./routes/product_route');
// var purchaseRouter = require('./routes/purchase_route');
// var ordersRouter = require('./routes/orders_route');
// var locationRouter = require('./routes/location_route');
// var stockRouter = require('./routes/stock_route');

// app.use(productRouter);
// app.use(purchaseRouter);
// app.use(ordersRouter);
// app.use(locationRouter);
// app.use(stockRouter);


// V2
var productRouter = require('./routes/v2/product_route');
var locationRouter = require('./routes/v2/location_route');
var purchaseRouter = require('./routes/v2/purchase_route');
var ordersRouter = require('./routes/v2/orders_route');
var stockRouter = require('./routes/v2/stock_route');

app.use(productRouter);
app.use(locationRouter);
app.use(purchaseRouter);
app.use(ordersRouter);
app.use(stockRouter);




// Genre = require('./models/genre.model');
// Book = require('./models/book.model');


// mongoose.connect('mongodb://localhost:27017/bookstore', {useNewUrlParser: true});

/*
// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', (req, res) => {
    res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
    Genre.getGenres((err, genres) => {
        if (err) {
            throw err;
        }
        res.json(genres);
    });
});

app.post('/api/genres', (req, res) => {
    var genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

app.put('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

app.delete('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    Genre.removeGenre(id, (err, genre) => {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:_id', (req, res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

app.post('/api/books', (req, res) => {
    var book = req.body;
    Book.addBook(book, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

app.put('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

app.delete('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    Book.removeBook(id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});
*/

app.listen(port, () => {
	console.log(`Running on port ${port}...`);
});
