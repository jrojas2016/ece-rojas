var express = require('express'),
  stylus = require('stylus'),
  rupture = require('rupture'),
  fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('port', (process.env.PORT || 5000));

stylus(fs.readFileSync('./views/jr_style.styl', 'utf8'))
  .use(rupture())
  .render(function (err, css){
    if (err) return console.error(err);
    fs.writeFileSync('./views/jr_style.css', css)
    console.log(css);
});

app.get('/', function (req, res) {
	res.render('jr_website.html');
});

var server = app.listen(app.get('port'), function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});