const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
})

app.get('/api/quotes', (req, res) => {
    const filterPerson = quotes.filter(author => {
        return author.person === req.query.person;
    });
    if (req.query.person) {
        res.send({quotes: filterPerson});
    } else {
        res.send({ quotes: quotes});
    }
});


app.get('/api/quotes', (req, res) => {
    const filterYear = quotes.filter(year => {
        return year.published === req.query.published;
    });
    if (req.query.published) {
        res.send({quotes: filterYear});
    } else {
        res.send({ quotes: quotes});
    }
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    }    ;
    if(newQuote.quote && newQuote.person){
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
});
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})