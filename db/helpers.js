import mongoose from "mongoose";
import { dbURI } from '../config/environment.js'


export function connectToDb() {
    return mongoose.connect(dbURI)
  }
  export function truncateDb(){
    if (mongoose.connection.readyState !== 0) {
      const { collections } = mongoose.connection
  
      const promises = Object.keys(collections).map(collection => {
        return mongoose.connection.collection(collection).deleteMany({})
      })
  
      return Promise.all(promises)
    }
  }
  export function disconnectDb() {
    if (mongoose.connection.readyState !== 0) {
      return mongoose.disconnect()
    }
  }