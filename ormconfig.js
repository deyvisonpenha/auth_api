module.exports = [{
  "name": "default",
  "type": "mongodb",
  "host": "localhost",
  "database": "pedeae_api",
  "useUnifiedTopology": true,
  "port": 27017,
  "database": "pedeae",
  "entities": ["./dist/models/*.{ts,js}"],
  "migrations": ["./dist/database/migrations/*.{ts,js}"],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
},
{
  "name": "postgres",
  "type": "postgres",
  "url": "postgres://gitpod@127.0.0.1",
  "database": "pedeae_new_api",
  "port": 5432,
  "entities": ["./src/models/*.{ts,js}"],
  "migrations": ["./src/database/migrations/*.{ts,js}"],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
}
]
