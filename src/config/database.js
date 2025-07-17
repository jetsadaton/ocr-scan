const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connection pool started');
  } catch (err) {
    console.error('Error starting connection pool:', err);
    throw err;
  }
}

async function close() {
    try {
      await oracledb.getPool().close(10);
      console.log('Connection pool closed');
    } catch (err) {
      console.error('Error closing connection pool:', err);
      throw err;
    }
}

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(statement, binds, opts);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
}

module.exports = {
    initialize,
    close,
    simpleExecute
};
