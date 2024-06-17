import { NotFound } from '../lib/errors.js';
import Player from '../models/player.js'
import express  from 'express'
import Team from '../models/team.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.get('/teams', async function playerIndex(req, res, next) {
    try {
      const players = await Player.find();
      return res.status(200).json(players);
    } catch (err) {
      next(err);
    }
  })

  router.post('/teams', secureRoute, async function teamIndex(req, res, next) {
    try {
        console.log(req.body.team)
        const existingTeam = await Team.findOne({ name: req.body.name })
        if (existingTeam) throw new AlreadyExists()
        req.body.manager = res.locals.currentUser
        const createdTeam = await Team.create(req.body);
        return res.status(201).json(createdTeam);
      } catch (err) {
        next(err);
      }
    })

    export default router