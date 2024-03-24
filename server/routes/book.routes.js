import express from 'express';
import bookCtrl from '../controllers/book.controller.js';
const router = express.Router();

router.route('/api/books')
    .get(bookCtrl.list)
    .post(bookCtrl.create)
    .delete(bookCtrl.deleteAll);

router.route('/api/books/:id')
    .get(bookCtrl.read)
    .put(bookCtrl.update)
    .delete(bookCtrl.remove);

router.param('id', bookCtrl.id);

export default router;
