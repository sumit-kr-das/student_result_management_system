import mongoose from 'mongoose';
import { db_connection } from '../config';

const connection = async () =>{
    try{
        await mongoose.connect(db_connection,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected...");
    }catch(err){
        console.log("DB Connection Error: ",err);
    }
}

export default connection;