var dotenv = require('dotenv');

dotenv.load();

// Local connection

module.exports = {
  client: 'mysql',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};


// Website connection
/*
module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.DB_NAME
  }
};*/