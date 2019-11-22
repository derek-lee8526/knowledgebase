let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let  db  =  require('./utils/database');
let firebase = require('./firebase');
const expressHbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layout/',
        partialsDir: 'views/partials/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let Routes = require('./router/router');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('home', { pageTitle: 'KnowledgeBase', heading: 'Welcome to Knowledgebase', homeCSS: true });
});

app.use(Routes);

app.listen(PORT, () => console.log('Server ready'))