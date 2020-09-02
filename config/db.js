const mongoose = require('mongoose')
const connectDB = async() => {
    try{
        const conn = await  mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        })
        console.log(`Mongodb connected on port ${conn.connection.host}`.cyan.bold)
    } catch(err){
        console.log(`Error:${err}`.red.bold)
        process.exit(1)
    }
}
module.exports = connectDB