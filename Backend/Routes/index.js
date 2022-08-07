const VideosController = require('../Controllers/Videos')
const router = require('express').Router();

router.get('/list', VideosController.get)

module.exports = router;