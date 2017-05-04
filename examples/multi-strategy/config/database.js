export default {
  development: {
    driver: 'sqlite3',
    database: 'multi_strategy_example_dev'
  },

  test: {
    driver: 'sqlite3',
    database: 'multi_strategy_example_test'
  },

  production: {
    driver: 'sqlite3',
    database: 'multi_strategy_example_prod'
  }
};
