import express from 'express'
import { register,login, update,logout, forgetPassword, resetPassword} from '../controllers/user.controller.js'
import { getFiles } from '../controllers/application.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../middlewares/multer.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/profile/update').post(isAuthenticated,upload.single('file'),update)
router.route('/forgetPassword').post(forgetPassword)
router.route('/resetPassword/:token').put(resetPassword)
router.route('/files/C:/Users/hp/OneDrive/Desktop/MiniProject/Project/backend/middlewares/files/:filename').get(isAuthenticated,getFiles);


export default router;
