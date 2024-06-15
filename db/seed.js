import Player from '../models/player.js'
import User from '../models/user.js'
import { connectToDb, disconnectDb, truncateDb } from './helpers.js'
import playerData from './data/players.js'
import bcrypt from 'bcrypt'


async function seed() {
    try {
        await connectToDb()
        console.log(' Database Connected ')

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

        console.log(`${adminUser.username} user created `)

        playerData.forEach(player => player.createdBy = adminUser)
        const players = await Player.create(playerData)

        console.log(` ${players.length} players added to Database`)
    } catch (err) {
        console.log('something did not work', err)

    }
    await disconnectDb()
    console.log('Bye bye')
}


seed()