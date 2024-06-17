import { NotFound } from '../lib/errors.js';
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

router.get('/players/:playerId', async function playerShow(req, res, next){
  const {playerId} = req.params
  try{
    const foundPlayer = await Player.findById(playerId)

    if(!foundPlayer) throw new NotFound()
      return res.status(200).json(foundPlayer)

  }catch(err){
    next(err)
  }


}
)

  export default router