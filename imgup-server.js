const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const conf = require('./conf.json');
const bcrypt = require('bcrypt')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(express.static('images'))
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { error: null })
})
app.get('/acnol.txt', (req, res) => {
    res.sendFile(__dirname + '/views/acnol.txt')
})
app.get('/login', (req, res) => {
    try {
        if (!bcrypt.compareSync(req.query.pw, conf.password)) {
            res.status(401).render('index.ejs', { error: "error: access deny" })
        } else {
            res.status(200).render('upload.ejs', { passsword: conf.password, domain: null, status: null, imgName: null, imgSize: null })
        }
    } catch (err) {
        res.status(500).send("there has been an error")
        console.log(err)
    }
})

app.get('/upload-list', (req, res) => {
    try {
        if (req.query.pw !== conf.password) {
            res.status(401).render('index.ejs', { error: "error: access deny" })
        } else {
            const images = fs.readdirSync('./images/')
            res.status(200).render('upload-list.ejs', { passsword: conf.password, domain: conf.domain, images: images })
        }
    } catch (err) {
        res.status(500).send("there has been an error")
        console.log(err)
    }
})

app.post('/upload', async(req, res) => {
    console.log(req.files.img.name)
    try {
        if (req.query.pw == conf.password) {

            if (!req.files) {
                res.render('index.ejs', { error: "error: no image was selected" })

            }
            if (req.files.img.name.includes('.png') || req.files.img.name.includes('.jpg') || req.files.img.name.includes('jpeg')) {
                if (fs.existsSync('./images/' + req.files.img.name)) {
                    res.render('upload.ejs', { passsword: req.query.pw, status: "an image with that name allread exists", imgName: null, imgSize: null })
                } else {
                    req.files.img.mv('./images/' + req.files.img.name)
                    res.render('upload.ejs', { passsword: req.query.pw, status: "image has been uploaded", domain: conf.domain, imgName: req.files.img.name.replace(' ', '%20'), imgSize: req.files.img.size })
                }
            } else {
                res.render('index.ejs', { error: "error: that isnt an image png, jpg and jpeg are supported" })
            }
        } else {
            res.render('index.ejs', { error: "error: access deny" })
        }
    } catch (err) {
        res.status(500).send('error');
        console.log(err)
    }
});


//start app 
const port = process.env.PORT || conf.port;

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);