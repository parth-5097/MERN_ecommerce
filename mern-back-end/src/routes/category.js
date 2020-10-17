const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middlewars');
const { addCategory, getCategories } = require('../controllers/category');
const router = express.Router();

router.post('/category/create', requireSignin, adminMiddleware, addCategory);
router.get('/category/getcategory', getCategories);

module.exports = router;