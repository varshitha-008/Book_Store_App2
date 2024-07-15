import { Sequelize } from "sequelize";
import 'dotenv/config.js';

const sequelize = new Sequelize(
  process.env.Sql_aiven_DB,
  process.env.Sql_aiven_user,
  process.env.Sql_aiven_password,
  {
    host: process.env.Sql_aiven_Host,
    dialect: 'mysql',
    port:process.env.Sql_aiven_port,
    dialectOptions: {
      connectTimeout: 60000 
    }
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;

// import mysql from 'mysql2';
// import 'dotenv/config.js';

// // Destructure environment variables
// const { Sql_aiven_Host, Sql_aiven_user, Sql_aiven_port, Sql_aiven_password, Sql_aiven_DB } = process.env;

// // Create a MySQL connection
// const sequelize = mysql.createConnection({
//   host: Sql_aiven_Host,
//   user: Sql_aiven_user,
//   port: Sql_aiven_port,
//   password: Sql_aiven_password,
//   database: Sql_aiven_DB,
//   ssl: {
//     // Uncomment and configure these lines if SSL is required
//     // ca: fs.readFileSync(__dirname + '/mysql-ca-cert.pem'),
//     rejectUnauthorized: false // Adjust based on your SSL requirements
//   },
// });

// // Function to test the connection
// function testConnection() {
//   sequelize.connect(error => {
//     if (error) {
//       console.error('Unable to connect to the database:', error);
//       return;
//     }
//     console.log('Connection has been established successfully.');
//   });
// }

// // Test the connection
// testConnection();

// export default sequelize;
