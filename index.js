const express = require('express');
const app = express();
const port = 8000
const path = require('path')
const formidable = require('formidable')
const mailer = require('./lib/mailer');

app.use('/', express.static('ui'));

app.use((req, res, next) => {
    const form = formidable.IncomingForm()
    if(req.method === 'GET'){
        return next()
    }

    form.parse(req, (err, fields, files) => {
        if(err){
            return console.error('Error parsing form: ', err)
        }
        Object.assign(req, {fields, files})
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

app.post('/contact', async (req, res) => {
    const {name, tel, email, website, about} = req.fields;

    const data = {
        name,
        email,
        subject: 'Contact From Website',
        message: {
            html: `
                <b>Name:\t</b> ${name} <br />
                <b>Email:\t</b> ${email} <br />
                <b>Tel.:\t</b> ${tel} <br />
                <b>Website:\t</b> ${website} <br />
                <br />
                <b><u>Details:</u></b> <br /> ${about} <br />
            `,
            text: `
                Name:\t ${name} \n
                Email:\t ${email} \n
                Tel.:\t ${tel} \n
                Website:\t ${website} \n
                \n
                Details:\n ${about} \n
            `,
        }
    }


    try {
        await mailer.sendMail(data);
        res.sendStatus(200);
    } catch (err) {
        console.error('There was an error sending email:', err)
        res.sendStatus(500);
    }
})

app.listen(port, (err) => {
    if (!err){
        console.log(`Server started on port ${port}`);
    }
})