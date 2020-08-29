require('dotenv').config();

module.exports = {
  "name": "default",
  "type": "mongodb",
  "url": `${process.env.MongoUrl}`,
  "useUnifiedTopology": true,
  "entities": ["./src/models/*.{ts,js}"],
  "migrations": ["./src/database/migrations/*.{ts,js}"],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
}
