const express = require('express');
const app = express();
const port = 8000
const path = require('path')

app.use('/', express.static('ui'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './ui/index.html'));
});

//TODO create about page
//TODO create portifolio page
// TODO add handler for contact form

app.listen(port, (err) => {
    if (!err){
        console.log(`Server started on port ${port}`);
    }
})