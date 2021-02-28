const path = require('path');



module.exports = function (app)
{app.get('/', (req, res) => {
   
    res.render('index');
  });
app.get('/login', (req, res) => {
    res.render('./layouts/login');
});
app.get('/signup', (req, res) => {
    res.render('./layouts/signup');
})

}

