import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async(req,res)=>{
    console.log("signupUser");
    // res.send("Signup User");

    try{
        const {fullName,username,password,confirmPassword,gender} = req.body;

        if(password!==confirmPassword){
            return res.status(400).json({error:"Passwords don't match"});
        }
        

    const user = await User.findOne({username});

    if(user){
        return res.status(400).json({error:"Username already exist"})
    }

    //HASH PASSWORD HERE

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?${username}`;

    const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender==="male" ? boyProfilePic : girlProfilePic,
    })

    if(newUser){
        //Generate JWT taken here
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id : newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
    
        });
    }else{
        res.status(400).json({error : "Invalid user data"});
    }


    }catch (error){
        console.log("Error in signup controllers", error.message)
        res.status(500).json({error : "Internal Server Error"})
    }
};

export const login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        // const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ error: "Invalid username or credential" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
       
    
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or credential"});
        }

        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })

    }catch(error){
        console.log("Error in Login Controller",error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const logout = async(req,res)=>{
    
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        console.log("Error in Logout controller",error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};