const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.sqlite')

async function createUsersDatabase(database) {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      age INTEGER,
      total_rides INTEGER DEFAULT 0,
      current_ride_id INTEGER,
      created_at DATE DEFAULT CURRENT_TIMESTAMP,
      updated_at DATE DEFAULT CURRENT_TIMESTAMP
    )
  `

    await database.run(createTableQuery, async function (err) {
        return new Promise((resolve, reject) => {
            if (err) {
                console.error('Erro ao criar tabela:', err.message)
                reject(err)
            }
        })
    })
}

async function createRidesDatabase(database) {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      passenger_id INTEGER NOT NULL,
      start_location TEXT,
      end_location TEXT,
      status TEXT CHECK (status IN ('pending', 'running', 'completed', 'cancelled')),
      start_time DATE,
      end_time DATE,
      payment_method TEXT CHECK (payment_method IN ('credit_card', 'cash')),
      created_at DATE DEFAULT CURRENT_TIMESTAMP,
      updated_at DATE DEFAULT CURRENT_TIMESTAMP
    )
  `

    await database.run(createTableQuery, function (err) {
        if (err) {
            console.error('Erro ao criar tabela:', err.message)
        }
    })
}

async function initializeDatabase() {
    await createUsersDatabase(db)
    await createRidesDatabase(db)

    db.close()
}

module.exports = { initializeDatabase, db }
