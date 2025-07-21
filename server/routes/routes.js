import express from 'express'

import { addUser, giveRandomPoints } from '../controllers/claimController.js'
import { getHistory, getLeaderboard } from '../controllers/leaderboard.js';


const router = express.Router();


router.post('/add-user',addUser)
router.post('/give-points',giveRandomPoints)
router.get('/get-leaderboard',getLeaderboard)
router.get('/get-history',getHistory)

export default router

