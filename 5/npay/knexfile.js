module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user     : 'indongyoo',
      password : '',
      database : 'npay',
      charset  : 'utf8'
    },
    pool: {
      min: 6,
      max: 15
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: false
  },

  staging: {
    client: 'pg',
    connection: {},
    pool: {
      min: 6,
      max: 15
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: false
  },

  production: {
    client: 'pg',
    connection: {},
    pool: {
      min: 6,
      max: 15
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: false
  }

};