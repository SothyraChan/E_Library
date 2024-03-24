import express from 'express';
import imageCtrl from '../controllers/image.controller.js';
const router = express.Router();

router.route('/api/images')
    .get(imageCtrl.list)
    .post(imageCtrl.create)
    .delete(imageCtrl.deleteAll);

router.route('/api/images/:id')
    .get(imageCtrl.read)
    .put(imageCtrl.update)
    .delete(imageCtrl.remove);

router.param('id', imageCtrl.id);

export default router;
