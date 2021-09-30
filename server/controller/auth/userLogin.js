import { User } from '../../models';
import bcrypt from 'bcrypt';

const userLogin = {
    async login(req,res){
        const { email, password } = req.body;

        if( !email || !password ){
            return res.status(301).json({ error: "Enter the currect email & password "});
        }

        const userExist = await User.findOne({ email });

        if(userExist){
            const matchPassword = await bcrypt.compare(password, userExist.password);
            if(matchPassword){
                let myToken = await userExist.getAuthToken();
                return res.status(200).json({ message: "login successfully", token: myToken});
            }else{
                return res.status(301).json({ error: "Enter the currect email & password "});
            }
        }else{
            return res.status(301).json({ error: "Enter the currect email & password "});
        }


        res.json({ message: "ok" });
    }
}

export default userLogin;