require('dotenv').config();

module.exports = {
  "name": "default",
  "type": "mongodb",
  "url": `${process.env.MongoUrl}`,
  "useUnifiedTopology": true,
  "entities": ["./dist/models/*.{ts,js}"],
  "migrations": ["./dist/database/migrations/*.{ts,js}"],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
}
