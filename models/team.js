import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    manager: {type: mongoose.Schema.ObjectId, ref: "User", required: false },
    budget: { type: String, required: false },
    players: [{type: mongoose.Schema.ObjectId, ref: "Player", required: false }]
  })

  export default mongoose.model("Team", teamSchema)