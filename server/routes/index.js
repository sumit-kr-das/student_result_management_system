import express from 'express';
const router = express.Router();
import { listUser, setUserController, userLogin, sendEmail, chengePassword, setResult, getResult } from '../controller';
import jwt from 'jsonwebtoken';
import { token_key } from '../config';

const jwtAuth = (req,res,next) =>{
    const authToken = req.headers.authorization;
    const token = authToken.split(' ')[1];
    jwt.verify(token, token_key,(err,payload)=>{
        if(err){
            res.status(403).send({ message:"invalid token" })
        }else{
            req.payload = payload;
            next();
        }
    });
};

router.post('/setUser',setUserController.setUser);
router.post('/login',userLogin.login);

router.get('/list',jwtAuth,listUser.list);

router.post('/email-send',sendEmail.email);
router.post('/change-password',chengePassword.password);


router.post("/new_result",setResult.result);
router.get("/get_result",getResult.result);

export default router;