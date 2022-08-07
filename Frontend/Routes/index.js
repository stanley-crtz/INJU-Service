const router = require('express').Router();
const path = require('path');

const HomePath = path.join(path.resolve(), 'Frontend', 'Views', 'index.html');

router.get('/', (req, res) => res.sendFile(HomePath))

module.exports = router;