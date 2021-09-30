import { otp, User } from "../../models";
import bcrypt from 'bcrypt';


const chengePassword = {
    async password(req,res){
        const isExist = await otp.findOne({ email: req.body.email, code: req.body.otp });

        if(isExist){

            let currentTime = new Date().getTime();
            let diff = isExist.expireIn - currentTime;

            if(diff < 0){
                return res.status(400).json({ error: "otp expire" });
            }else{

                //let myToken = await isExist.getAuthToken();
                let user = await User.findOne({ email: req.body.email }); 
                user.password = bcrypt.hash(req.body.password,10);
                user.save(); 
                //return res.status(200).json({ msg:"Password Chenged", token: myToken });
            }

        }else{
            res.status(401).json('Invalid otp');
        }
        res.status(200).json('password updated successfully');
    }
}

export default chengePassword;