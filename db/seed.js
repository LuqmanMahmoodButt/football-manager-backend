import Player from '../models/player.js'
import User from '../models/user.js'
import { connectToDb, disconnectDb, truncateDb } from './helpers.js'
import playerData from './data/players.js'
import bcrypt from 'bcrypt'
import Team from '../models/team.js'
import { startingBudget } from '../config/environment.js'

async function seed() {
    try {
        await connectToDb()
        console.log('Database Connected')
        await truncateDb()
        console.log('🫓  Database Dropped 🫓')

        const adminObject = {
            username: 'admin',
            email: 'admin@email.com',
            password: 'pass',
            isAdmin: true,
        }

        const passwordHash = bcrypt.hashSync(adminObject.password, 10)
        adminObject.password = passwordHash
        const adminUser = await User.create(adminObject)
        console.log(`${adminUser.username} user created`)

        playerData.forEach(player => player.createdBy = adminUser._id)
        const players = await Player.create(playerData)
        console.log(`${players.length} players added to Database`)

        const teamData = {
            manager: adminUser._id,
            budget: "∞",
            players: [players[0], players[12], players[5], players[27], players[89], players[94], players[75]]
        }

        const team = await Team.create(teamData)
        console.log('my team', team)
    } catch (err) {
        console.log('something did not work', err)
    }
    await disconnectDb()
    console.log('Bye bye')
}

seed()