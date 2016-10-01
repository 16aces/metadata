var express = require('express');

var app = express();

var path = require('path');
 var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
bodyParser = require('body-parser'),
app.use(bodyParser.json())

app.listen( process.env.PORT || 3000,function(){
  console.log("server running")
})
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'uploads');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});
var upload = multer({storage: storage}).single('upload')

 app.get('/favicon.ico', function(req, res) {
    res.send(200);
})

app.get('/*', function(req, res) { 
  res.sendFile(path.join(__dirname + '/index.html'))

});

app.post('/upload', function(request, response) {
  upload(request, response, function(err) {
  if(err) {
    console.log('Error Occured');
    return;
  }
  console.log(request.file.size);
  response.end('Your File is ' +request.file.size + " bytes");
  console.log('Photo Uploaded');
  })
});

/*
app.post('/upload', upload.single('upload'),  function(req, res) {
  console.log(req.files);
});*/