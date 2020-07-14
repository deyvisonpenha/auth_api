module.exports = {
  "name": "default",
  "type": "mongodb",
   "url": 'mongodb+srv://deyvisonpenha:de_ison1@cluster0-faoju.mongodb.net/pedeae?retryWrites=true&w=majority',
  "entities": ["./src/models/*.{ts,js}"],
  "migrations": ["./src/database/migrations/*.{ts,js}"],
  "cli": {
      "migrationsDir": "./src/database/migrations/"
  }
}
