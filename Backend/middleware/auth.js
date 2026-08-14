import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"

export const auth = async(req,res,next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.Status(401).json({
                success:false,
                message:"token not found"
            })
        }

        
        console.log(process.env.JWT_SECTRET_KEY)
        console.log(token)
        const decode = await jwt.verify(token,process.env.JWT_SECTRET_KEY);
        req.user = decode;

        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}