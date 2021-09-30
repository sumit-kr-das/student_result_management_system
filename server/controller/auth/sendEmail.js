import { User, otp } from "../../models";
import { mailer } from '../../controller';

const sendEmail = {
    async email(req,res){
        if( !req.body.email ){
            return res.status(401).json('Enter a valid email !');
        }

        const isExist = await User.findOne({ email: req.body.email });

        if(isExist){
            let generateOtp = Math.floor((Math.random()*10000)+1)
            let otpData = new otp({ email: req.body.email, code: generateOtp, expireIn: new Date().getTime()+300*100 });
            let saveOtp = await otpData.save();

            // send otp
            // mailer( generateOtp, req.body.email );
        }else{
            return res.status(401).json({ error: "User is not exist"});
        }

        res.status(200).json({ Success: "Please check your email id" });
    }
}

export default sendEmail;

