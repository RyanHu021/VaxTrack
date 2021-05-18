// const cardOCR = require('./scripts/cardOCR');
// cardOCR.scanVaccineCard('./cards/michael.jpg').then((result) => console.log(result));

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.get('/', (req, res) => {
	res.send('david is hot');
});

app.listen(process.env.PORT || 3000);