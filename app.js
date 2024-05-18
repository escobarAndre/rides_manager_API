const express = require('express')
const fs = require('fs')
const { initializeDatabase } = require('./src/utils/database.js')

const healthCheck = require('./src/routes/healthCheckRoutes')
const userRoutes = require('./src/routes/usersRoutes')
const rideRoutes = require('./src/routes/rideRoutes')

const app = express()

initializeDatabase()

app.use(express.json())
app.use('/health_check', healthCheck)
app.use('/users', userRoutes)
app.use('/ride', rideRoutes)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`)
})

process.on('SIGINT', () => {
    server.close(() => {
        const readline = require('readline')

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        rl.question('Want delete database? yes/no ', (answer) => {
            const parsedAnswer = answer.toLocaleLowerCase()

            if (parsedAnswer === 'yes' || parsedAnswer === 'y') {
                fs.unlink('./database.sqlite', (err) => {
                    if (err) {
                        console.error('Error deleting file:', err)
                        return
                    }
                })
            }

            rl.close()
        })
    })
})
