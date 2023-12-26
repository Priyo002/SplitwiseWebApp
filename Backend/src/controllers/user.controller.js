import { User } from "../models/user.models.js";

const registerUser = async (req,res) => {

    const { username, email, password } = req.body;
    
    const isUserExist = await User.findOne({email})

    if(isUserExist){
        res.send("User Already Exists try to log in");
    }

    const user = await User.create({
        username,email,password
    })

    if(!user){
        res.status(501).send("Problem on Creating User");
    }

    res.status(200).send("Registered Successfully");
}

const logInUser = async (req,res) => {
    const { email , password } = req.body
    
    const isUserExist = await User.findOne({email})

    if(isUserExist){
        if(isUserExist.isPasswordCorrect(password)){
            await User.updateOne({email : isUserExist.email},{isLoggedIn: true});
            res.status(200).send("Log In Successfully");
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
            await User.updateOne({email : isUserExist.email},{isLoggedIn: false});
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