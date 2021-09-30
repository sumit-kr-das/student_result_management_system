import { User } from '../../models';
import bcrypt from 'bcrypt';

const setUserController = {
    async setUser(req,res){
        const { name, phone, email, password, confirm_password } = req.body;
        
        if( !name || !phone || !email || !password || password !== confirm_password ){
            res.status(401).json({ error:"authentication error" });
        }

        try{
            const existUser =  await User.findOne({email:email});
            if(existUser){
                res.status(400).json({error:"User is already exist"});
            }

            //hash password
            const hashPassword = await bcrypt.hash(password,10);

            const saveData = new User({ name, phone, email, password: hashPassword });
            const registered = await saveData.save();
            let myToken = await saveData.getAuthToken();
            if(registered){
                res.status(200).json({success:"User is successfully registered", token: myToken});
            }else{
                res.status(400).json({error:"User registration failed"});
            }
        }catch(err){
            console.log('Error in: controller/setUserController> ', err.message);
        }
    }
}

export default setUserController;