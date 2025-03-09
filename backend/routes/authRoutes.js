import express from 'express';
import { loginUser, registerUser } from '../Controllers/authController.js';
import { addplayerConroller, deletePlayerController, findAllPlayersController, findPlayerController, updatePlayerController } from '../Controllers/playerController.js';

import { findallteam } from '../Controllers/leaderboardController.js';

import { addplayertoteamConroller, getPlayerById, getTeamPlayers } from '../Controllers/teamController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/addplayer',addplayerConroller);
router.post('/updateplayer',updatePlayerController)
router.get('/findplayer/:name/:university',findPlayerController)
router.get('/allplayers',findAllPlayersController)
router.post('/deleteplayer',deletePlayerController)


router.get('/leaderboard',findallteam)

router.post('/addplayertoteam',addplayertoteamConroller);
router.get('/team/:teamname',getTeamPlayers);
router.get('/player/:id',getPlayerById);

export default router;