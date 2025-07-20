// Generated with IBM Granite
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect);

router.post('/', upload.single('cover'), bookController.store);
router.get('/', bookController.index);
router.get('/:id', bookController.show);
router.put('/:id', upload.single('cover'), bookController.update);
router.delete('/:id', bookController.destroy);

module.exports = router;
