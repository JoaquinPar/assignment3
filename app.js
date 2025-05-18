const express = require('express');
const app = express();

const port = 8000;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/*splat', (req, res) => {
    res.status(404);
    res.send('404 not found');
});

app.listen(port, () => {
    console.log(`Running express server on ${port}`)
})