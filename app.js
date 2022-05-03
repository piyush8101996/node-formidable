var express = require('express');
var formidable = require('formidable');
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
var fileupload = require("express-fileupload");
var app = express();

/*app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});*/

app.use(fileupload());
//body-parser

app.use(express.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())

app.use(express.json());

app.post('/', function (req, res) {

    console.log("hello : ", req.body);
    let email = req.body.email;
    //uploadingf a file
    var form = new formidable.IncomingForm();
    form.parse(req);

    /*form.on('fileBegin', function (name, file) {
        // console.log("data : ",JSON.parse(data));
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file) {
        console.log(name);
        console.log('Uploaded ' + file.name);
    });*/
    
    //Email section

    var transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: "piyusheng1996@gmail.com",
            pass: "Piyush@1996"
        }
    })
   
    //credentialscls
    var mailoptions = {
        from: "piyusheng1996@gmail.com",
        to:email,
        subject: "Node js Tutorial",
        text: "Welcome to node js leaening",
        html: '<h2 style="color:#ff6600;">Hello People!, Welcome to Bacancy!</h2>',
    }

    transporter.sendMail(mailoptions, function (err, info) {
        if (err) {
            console.log("mail is not sent", err)
        } else {
            console.log("email has been sent", info)
        }
    })
     res.send('hello')
    //res.sendFile(__dirname + '/index.html');



});

app.listen(4000, () => {
    console.log('port is listening')
});