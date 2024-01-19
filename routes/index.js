const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');

//Pagina de inicio iniciada sesión / sin iniciar sesión
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    res.render('index', { title: 'Bienvenido a Sofá y peli' });
  }
});

router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));
router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));

module.exports = router;
