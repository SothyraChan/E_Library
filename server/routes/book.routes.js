import express from 'express';
import bookCtrl from '../controllers/book.controller.js';
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router();

router.route('/api/books')
    .get(bookCtrl.list)
    .post(bookCtrl.create)
    .delete(bookCtrl.deleteAll);

router.route('/api/books/:bookId')
    .get(bookCtrl.read)
    .put(bookCtrl.update)
    .delete(bookCtrl.remove);
router.route('/api/books/by/:userId')
.post(authCtrl.hasAuthorization, bookCtrl.create)


router.param('id', bookCtrl.id);

export default router;
