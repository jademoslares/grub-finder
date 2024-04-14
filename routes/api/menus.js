const express = require('express');
const router = express.Router();
const menusCtrl = require('../controllers/menus');

//Routes
router.get('/', menusCtrl.index);
router.get('/:id', menusCtrl.show);
router.post('/', menusCtrl.create);
router.put('/:id', menusCtrl.update);
router.delete('/:id', menusCtrl.deleteItem);


module.exports = router;