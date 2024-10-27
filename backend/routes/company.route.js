import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import {getCompanies, getCompany, getCompanyById, getStudentCompanies, registerdCompany, updateCompany} from '../controllers/company.controller.js'
const router = express.Router()
import upload from '../middlewares/multer.js'

router.route('/register').post(isAuthenticated,upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]),registerdCompany) 

      //here to
      
router.route('/get').get(isAuthenticated,getCompany)              //for newly recruiter who registered his company
router.route('/getCompanies').get(isAuthenticated,getCompanies)      //testing mode                  // for TPO
router.route('/get/:id').get(isAuthenticated,getCompanyById)                   // accepting and rejecting companies
router.route('/update/:id').post(isAuthenticated,updateCompany);
router.route('/company').get(isAuthenticated,getStudentCompanies);                // use this for student company

export default router;
