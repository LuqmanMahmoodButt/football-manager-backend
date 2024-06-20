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

        const predefinedPlayers = [
            {
                createdBy: adminUser._id,
                playerCost: 9000000,
                name: "Lionel Messi",
                nationality: "Argentina",
                position: "Striker",
                image: "https://cdn.realsport101.com/images/ncavvykf/realsport-production/b1fcffaa2dcc432f5b27052de15e42b82a0beb58-240x340.png?w=240&h=340&auto=format",
                pac: 93,
                sho: 98,
                pas: 97,
                dri: 99,
                def: 43,
                phy: 73
            },
            {
                createdBy: adminUser._id,
                playerCost: 4000000,
                name: "Ronaldinho",
                nationality: "Brazil",
                position: "Striker",
                image: "https://fifauteam.com/images/items/icons/fifa23/items/ronaldinho-94.webp",
                pac: 92,
                sho: 90,
                pas: 91,
                dri: 95,
                def: 37,
                phy: 81
            },
            {
                createdBy: adminUser._id,
                playerCost: 2000000,
                name: "David Beckham",
                nationality: "England",
                position: "Midfielder",
                image: "https://fifauteam.com/images/items/icons/fifa23/items/beckham-92.webp",
                pac: 80,
                sho: 87,
                pas: 95,
                dri: 88,
                def: 69,
                phy: 82
            },
            {
                createdBy: adminUser._id,
                playerCost: 6000000,
                name: "Zidane",
                nationality: "France",
                position: "Midfielder",
                image: "https://fifauteam.com/images/items/icons/fifa23/items/zidane-96.webp",
                pac: 85,
                sho: 92,
                pas: 96,
                dri: 95,
                def: 75,
                phy: 86
            },
            {
                createdBy: adminUser._id,
                playerCost: 1000000,
                name: "Nemanja Vidić",
                nationality: "Serbia",
                position: "Defender",
                image: "https://fifauteam.com/images/items/icons/fifa23/items/vidic-90.webp",
                pac: 78,
                sho: 50,
                pas: 62,
                dri: 64,
                def: 93,
                phy: 91
            },
            {
                createdBy: adminUser._id,
                playerCost: 1000000,
                name: "Van der Sar",
                nationality: "Netherlands",
                position: "Goalkeeper",
                image: "https://fifauteam.com/images/items/icons/fifa23/items/vandersar-91.webp",
                pac: 85,
                sho: 90,
                pas: 81,
                dri: 89,
                def: 40,
                phy: 95
            },
            {
                createdBy: adminUser._id,
                playerCost: 1000000,
                name: "Rio Ferdinand",
                nationality: "England",
                position: "Defender",
                image: "https://fifauteam.com/images/items/icons/fifa23/items/rioferdinand-90.webp",
                pac: 83,
                sho: 49,
                pas: 67,
                dri: 65,
                def: 91,
                phy: 86
            }
        ]

        // Create predefined players and extract their IDs
        const createdPredefinedPlayers = await Player.create(predefinedPlayers)
        const predefinedPlayerIds = createdPredefinedPlayers.map(player => player._id)

        const teamData = {
            manager: adminUser._id,
            budget: startingBudget,
            players: predefinedPlayerIds
        }

        const team = await Team.create(teamData)
        console.log('Team created with predefined players')
    } catch (err) {
        console.log('something did not work', err)
    }
    await disconnectDb()
    console.log('Bye bye')
}

seed()