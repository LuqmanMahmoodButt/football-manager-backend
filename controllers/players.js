import Player from '../models/player.js'
import express  from 'express'


const router = express.Router()

router.get('/players', async function playerIndex(req, res, next) {
    try {
      const players = await Player.find();
      return res.status(200).json(players);
    } catch (err) {
      next(err);
    }
  })

  export default router