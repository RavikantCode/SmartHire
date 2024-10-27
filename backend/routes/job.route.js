import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { getAdminJobs, getAllJobs, getAllJobsById, postJob,SaveJob ,getSavedJobs, saveScore} from '../controllers/job.controller.js'
import {checkRecruiterAccepted} from '../middlewares/checkRecruiterAccepted.js'
import { checkJobAccepted } from '../middlewares/checkJobAccepted.js'

const router = express.Router()

router.route('/post').post(isAuthenticated,checkJobAccepted,checkRecruiterAccepted,postJob)
router.route('/get').get(isAuthenticated,getAllJobs)
router.route('/getadminjob').get(isAuthenticated,getAdminJobs)
router.route('/get/:id').get(isAuthenticated,getAllJobsById)              // check 66f6879ef8c16804b2c80074
router.route('/savejob/:id').post(isAuthenticated,SaveJob)
router.route('/getsavedjob').get(isAuthenticated,getSavedJobs)
router.route('/:jobId/score').post(isAuthenticated,saveScore)

export default router;
