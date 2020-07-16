module.exports = {
  "name": "default",
  "type": "mongodb",
  "host": "localhost",
  "database": "pedeae_api",
  "useUnifiedTopology": true,
  "port": 27017,
  "database": "pedeae",
  "entities": ["./src/models/*.{ts,js}"],
  "migrations": ["./src/database/migrations/*.{ts,js}"],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
}
