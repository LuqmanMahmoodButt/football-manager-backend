import { NotFound } from '../lib/errors.js';
import Player from '../models/player.js'
import express from 'express'
import Team from '../models/team.js'
import secureRoute from '../middleware/secureRoute.js'


const router = express.Router()

router.get('/teams', async function playerIndex(req, res, next) {
  try {
    const teams = await Team.find().populate('players').populate('manager');
  
    return res.status(200).json(teams);
  
  } catch (err) {
    next(err);
  }
})

router.get('/userteam', secureRoute, async function getUserTeam(req, res, next) {

  const team = await Team.findOne({ manager: res.locals.currentUser._id }).populate("players")

  return res.status(200).json(team)
})

router.put('/teams', secureRoute, async function teamIndex(req, res, next) {
  try {
    const existingTeam = await Team.findOneAndUpdate({ manager: res.locals.currentUser._id }, req.body, {new: true}).populate("players")
    // if (existingTeam) throw new AlreadyExists()
    console.log(res.locals.currentUser)
    console.log(existingTeam)

    return res.status(201).json(existingTeam);

  } catch (err) {
    next(err);
  }
})


export default router