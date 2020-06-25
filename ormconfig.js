module.exports = {
  "name": "default",
  "type": "postgres",
  "url": "postgres://gitpod@127.0.0.1/ipet",
  "entities": ["./src/models/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
      "migrationsDir": "./src/database/migrations/"
  }
}
