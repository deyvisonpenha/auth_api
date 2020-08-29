# auth_api
implement a auth system

## Mongo DB
require('dotenv').config()

## database
$ psql -h localhost -d postgres
```
# CREATE USER postgres WITH PASSWORD '123456';
# ALTER USER postgres WITH SUPERUSER;
# create database pedeae
```

module.exports = {
  "name": "default",
  "type": "mongodb",
  "url": `${process.env.MongoUrl}`,
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  "synchronize": true,
  "logging": true,
  "entities": ["src/schemas/*.ts"]
}

## postgres DB
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

## Working with timezones
yarn add moment-timezone
