import express from 'express'
import {joboffers,updateJobOffers,getAllCompany,getCompanyById, acceptCompany } from '../controllers/tpo.controller.js'
import isAuthenticated from "../middlewares/isAuthenticated.js"
import authenticate from "../middlewares/authenticate.js"

const router=express.Router()

router.route('/JobOffers').get(isAuthenticated,joboffers)
router.route('/UpdateOffers/:id').put(isAuthenticated,updateJobOffers)
router.route('/getCompany').get(isAuthenticated,getAllCompany)
router.route('/acceptCompany/:id').post(isAuthenticated,acceptCompany)
router.route('/Company/:id').get(isAuthenticated,getCompanyById)


export default router

