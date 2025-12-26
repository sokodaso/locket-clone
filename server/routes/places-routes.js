const express = require('express');

const router = express.Router();
router.get('/', (req, res, next) => {
    console.log('Fetching all places');
    res.json({ message: 'List of all places' })
    
});

module.exports = router;