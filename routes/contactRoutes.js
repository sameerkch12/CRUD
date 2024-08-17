const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/createContact', contactController.createContact);
router.post('/getContact/:id', contactController.getContact);

router.post('/updateContact/:id', contactController.updateContact);
router.post('/deleteContact/:id', contactController.deleteContact);

module.exports = router;
