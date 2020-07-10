module.exports = {
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "123456",
  "database": "pedeae",
  "entities": ["./src/models/*.{ts,js}"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
      "migrationsDir": "./src/database/migrations/"
  }
}
