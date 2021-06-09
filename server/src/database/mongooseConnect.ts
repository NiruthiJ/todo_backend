import mongoose from 'mongoose';
const dotenv = require('dotenv');

dotenv.config( { path : 'config.env'} )
const url = process.env.URL || ""


const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB