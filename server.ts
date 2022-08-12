import express from 'express';

const app = express();

// For Cloudflare DDOS protection, because they make a post request
app.get('/', (req, res) => {
    res.send('This is a test web page!');
    console.log("Someone viewed the main page!");
})

app.post('/', (req, res) => {
    res.send('This is a test web page!');
    console.log("Someone viewed the main page!");
})



app.get('/login', (req, res) => {
    res.send('Bro, why you so needy');
})


app.get('/clear', (req, res) => {
    console.clear();
})


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
    