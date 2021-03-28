import knex from 'knex';

const _knex = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'admin1999',
    database: 'sakila',
    port: 3306
  },
  useNullAsDefault: true,
  pool: { min: 0, max: 50 }
});

export default _knex;
