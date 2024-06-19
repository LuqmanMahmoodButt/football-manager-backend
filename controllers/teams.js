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
        const existingTeam = await Team.findOne({ name: req.body.manager })
        // if (existingTeam) throw new AlreadyExists()
        console.log(res.locals.currentUser)
        const teamData = {
          budget: req.body.budget,
          manager: res.locals.currentUser,
          players: req.body.players
      }

      const createdTeam = await Team.create(teamData);
      return res.status(201).json(createdTeam);

      } catch (err) {
        next(err);
      }
    })

    
    export default router