const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
mongoose
    .connect(process.env.DB_CONNECT,{ 
    	useNewUrlParser: true,
    	useUnifiedTopology: true, 
        
    })
    .catch(e=>{
        console.log('Error de conexion:',e.message)
    });


const db = mongoose.connection;


module.exports = db;