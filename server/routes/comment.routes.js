import express from 'express';
import commentCtrl from '../controllers/comment.controller.js';
const router = express.Router();

router.route('/api/comments')
    .get(commentCtrl.list)
    .post(commentCtrl.create)
    .delete(commentCtrl.deleteAll);

router.route('/api/comments/:commentId')
    .get(commentCtrl.read)
    .put(commentCtrl.update)
    .delete(commentCtrl.remove);

router.param('id', commentCtrl.id);

export default router;
