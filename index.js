const express = require('express');
const app = express();
const port = 8000
const path = require('path')
const formidable = require('formidable')

app.use('/', express.static('ui'));

app.use('/', (req, res, next) => {
    const form = formidable.IncomingForm()
    if(req.method === 'GET'){
        return next()
    }

    form.parse(req, (err, fields, files) => {
        if(err){
            return console.error('Error parsing form: ', err)
        }
        req = {...req, fields, files};
        next()
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './ui/index.html'));
});

app.get('/portifolio', (req, res) => {
    //TODO create portifolio page
    res.sendFile(path.resolve(__dirname, './ui/misc-pages/maintainance.html'));
})

app.get('/about', (req, res) => {
    //TODO create about page
    res.sendFile(path.resolve(__dirname, './ui/misc-pages/maintainance.html'));
})

app.get('/policy', (req, res) => {
    //TODO create policy page
    res.sendFile(path.resolve(__dirname, './ui/misc-pages/maintainance.html'));
})

app.post('/contact', (req, res) => {
    // TODO Handle contact form
    const {name, tel, email, website, about} = req.fields;
})

app.listen(port, (err) => {
    if (!err){
        console.log(`Server started on port ${port}`);
    }
})