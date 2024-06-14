import mongoose from "mongoose";
import { dbURI } from '../config/environment.js'


export function connectToDb() {
    return mongoose.connect(dbURI)
  }
  
  export function disconnectDb() {
    if (mongoose.connection.readyState !== 0) {
      return mongoose.disconnect()
    }
  }