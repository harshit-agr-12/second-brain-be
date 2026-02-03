import express from "express";
import { userMiddleware } from "../../middlewares/middleware";
import { addContentSchema, getMetaDataSchema, removeContentSchema , getAllContentSchema } from "./content.schema.js";
import { validate } from "../../middlewares/validate";
import { addContentController, getAllContentController , getContentByTypeController, getMetaDataController , removeContentController } from "./content.controller";
const router = express.Router();


router.post('/add',userMiddleware, validate(addContentSchema), addContentController);
// //working
router.get('/getAllContent', userMiddleware  , getAllContentController);

router.delete('/remove/:id',userMiddleware, removeContentController);

// //working
router.post('/getMetaData',userMiddleware ,validate(getMetaDataSchema), getMetaDataController );


// router.get('/:type',userMiddleware, getContentByTypeController)


export default router;


