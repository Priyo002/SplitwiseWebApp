import { User } from "../models/user.models.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        return {
            error: 400,
            message: "Error from generateAccessAndRefreshTokens"
        }
    }
}
const registerUser = async (req,res) => {

    const { username, email, password } = req.body;
    
    const isUserExist = await User.findOne({email})

    if(isUserExist){
        res.send({message:"User Already Exists try to log in"});
    }

    const user = await User.create({
        username,email,password
    })
    if(!user){
        res.status(501).json({message:"Problem on Creating User"});
    }
    res.status(200).json({user,message:"Registered Successfully"})
}

const logInUser = async (req,res) => {
    const { email , password } = req.body
    
    const isUserExist = await User.findOne({email})

    if(isUserExist){
        if(isUserExist.isPasswordCorrect(password)){
            await User.updateOne({email : isUserExist.email},{
                $set: {isLoggedIn: true}
            });
            const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(isUserExist._id)

            const loggedInUser = await User.findById(isUserExist._id).select("-password -refreshToken")

            const options = {
                httpOnly: true,
                secure: true
            }
            return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(
                    {
                        user: loggedInUser, 
                        accessToken, 
                        refreshToken,
                        message : "User Logged In Successfully"
                    },
                )
        }
        else res.status(404).send("Password is incorrect");
    }
    else{
        res.status(404).send("User does not exist register First");
    }
}

const logOutUser = async (req,res) => {
    const { email , password } = req.body
    
    const isUserExist = await User.findOne({email})

    if(isUserExist?.isLoggedIn){
        if(isUserExist.isPasswordCorrect(password)){
            await User.updateOne({email : isUserExist.email},{
                $set: {isLoggedIn: false}
            });
            res.status(200).send("Log Out Successfully");
        }
        else res.status(404).send("Password is incorrect")
    }
    else{
        res.status(404).send("User does not exist register First or Log in First");
    }
} 

export {
    registerUser,
    logInUser,
    logOutUser
}