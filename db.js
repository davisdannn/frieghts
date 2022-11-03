const Pool = require('pg').Pool

const proConfig = {
    connectionString : process.env.URL ,
    ssl: {      
        require: true,
        rejectUnauthorized: false 
      } 
}


const dev = {

    user: process.env.NAME,
    password: process.env.AUTH,
    host: 'localhost',
    port: 5432,
    database: 'freights'

    
}

const pool = new Pool (process.env.NODE_ENV === 'production' ? proConfig : dev)


module.exports = pool;