const express = require('express')
const app = express()
var path = require('path')
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

var main_routes = require('./routers/main_router');
const connection = require('./routers/db');
// const { connect } = require('http2');

const host = '127.0.0.1'
//const host = '0.0.0.0'
const port = 8080

app.use(express.static('css'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));

// Налаштування сеансу та проміжного програмного забезпечення флеш-пам’яті
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Налаштувати проміжне програмне забезпечення для флеш-повідомлень
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Use mainRouter as middleware
app.use('/', main_routes)


app.post('/add-user', (req, res) => {
  const { name, second_name, middle_name } = req.body;

  const query = 'INSERT INTO workers (name, surname, middle_name) VALUES (?, ?, ?)';
  connection.query(query, [name, second_name, middle_name], (err, result) => {
    if (err) {
      console.error('Error adding user to SQL table:', err);
      req.flash('error', 'Не вдалося додати користувача');
    } else {
      console.log('User added to SQL table successfully');
      req.flash('success', 'Користувача додано успішно!');
      req.flash('isTemporary', true); // Прапорець для позначення тимчасового повідомлення
    }
    res.redirect('/');
  });
});


app.listen(port, host, () => {
  console.log(`Start app on port ${port}`)
})



// app.post('/add-user', (req, res) => {
//   const { name, second_name, middle_name } = req.body;

//   const query = 'INSERT INTO workers (name, surname, middle_name) VALUES (?, ?, ?)';
//   connection.query(query, [name, second_name, middle_name], (err, result) => {
//     if (err) {
//       console.error('Error adding user to SQL table:', err);
//       res.render('error');
//     } else {
//       console.log('User added to SQL table successfully');
//       res.redirect('/');
//     }
//   });
// });