const db = require('../models/arangodb');

class AuthController {

    async signup(req,res){
        const {email, password, mobile , userId} = req.body;
        
        const mobileVerificationCode = Math.floor(1000 + Math.random() * 9000);
        const emailVerificationCode = Math.floor(1000 + Math.random() * 9000);

        const userInfo = {
            _key:userId,
            email,
            password,
            mobile,
            mobileVerificationCode,
            emailVerificationCode,
            active:false,
        };

        try{
            await db.users.save(userInfo);
            res.status(201);
            res.json({
                msg:'signup successful'
            })
        }catch(error){
            res.status(400);
            res.json({
                msg:'Signup Failed',
                error:error.message,
            })
        }
    }

    async login(req,res){
        await db.users.get()
    }

    forgotPassword(req,res){
        res.send('forgotPassword');
    }

    resetPassword(req,res){
        res.send('resetPassword');
    }

    logout(req,res){
        res.send('logout');
    }
}

module.exports = new AuthController();