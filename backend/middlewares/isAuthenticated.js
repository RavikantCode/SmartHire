import jwt from 'jsonwebtoken'

const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(200).json({msg:'Authentictaion Failure',
                success:false
            })
        }
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(400).json({
                msg:"Invalid Token",
                success:false
            })
        }
        req.id=decode.userId;
        next()
    }
    catch(e){
        console.log(e);
        
    }
}
export default isAuthenticated;