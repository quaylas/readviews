const path = require('path');



module.exports = function (app)
{app.get('/', (req, res) => {
   
    res.render('index');
  });
app.get('/login', (req, res) => {
    
    res.render('./layouts/login');
});
app.get('/signup', (req, res) => {
    console.log('say hello');
    res.render('./layouts/signup');
});

// app.get('/dashboard/', (req, res) => {
//     res.render('/dashboard');
// });


}
