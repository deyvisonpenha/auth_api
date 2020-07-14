module.exports = {
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "123456",
  "database": "pedeae",
  "entities": ["./dist/models/*.{ts,js}"],
  "migrations": ["./dist/database/migrations/*.{ts,js}"],
  "cli": {
      "migrationsDir": "./src/database/migrations/"
  }
}
