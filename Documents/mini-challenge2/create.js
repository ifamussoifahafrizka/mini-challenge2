const {
    User
} = require('./models')
User.create({
        username: 'namaifamu',
        password: 'pwifadong'
    })
    .then(user => {
        console.log(user)
    })