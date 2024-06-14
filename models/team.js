import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    manager: { type: String, unique: true, maxlength: 50, required: true },
    budget: { type: String, required: true },
    Player1: { type: String, required: true },
    Player1Position: { type: String, required: true },
    Player2: { type: String, required: true },
    Player2Position: { type: String, required: true },
    Player3: { type: String, required: true },
    Player3Position: { type: String, required: true },
    Player4: { type: String, required: true },
    Player4Position: { type: String, required: true },
    Player5: { type: String, required: true },
    Player5Position: { type: String, required: true },
    GoalKeeper: { type: String, required: true },
  })

  export default mongoose.model("Team", teamSchema)