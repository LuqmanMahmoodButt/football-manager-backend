import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
    playerCost: {type: Number, required: true},
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    position: { type: String, required: true },
    pac: { type: Number, required: true },
    sho: { type: Number, required: true },
    pas: { type: Number, required: true },
    dri: { type: Number, required: true },
    def: { type: Number, required: true },
    phy: { type: Number, required: true },
    createdBy: {type: mongoose.Schema.ObjectId, ref: "User", required: true },
    image: {type: String, required: true }
  })

  export default mongoose.model("Player", playerSchema)