const express = require('express')
const app = express()
const {
  User
} = require('./models')
const port = 7000;
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}));

app.post('/users', (req, res) => {
  User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(user => {
      res.send('Username berhasil dibuat')
    })
});

app.get('/users/create', (req, res) => {
  res.render('users/create')
});


app.get('/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.render('users/index', {
        user: users
      })
    })
});

app.get('/users/:id', (req, res) => {
  User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      res.status(200).json(user)
    })
});

app.post('/users/update/:id', (req, res) => {
  User.update({
      username: req.body.username,
      password: req.body.password
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      res.status(200).json("User update")
    }).catch(err => {
      res.status(422).json("Can’t update user")
    })
});

app.get('/users/update/:id', (req, res) => {
  User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      res.render('update', {
        userData : user
      })
    })
});

app.get('/users/delete/:id', (req, res) => {
  User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.send('data user berhasil di hapus')
    })
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})