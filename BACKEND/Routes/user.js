const express = require('express');
const zod= require ('zod');
const router = express.Router();
const {User, Account} = require("../db");
const jwt=require("jsonwebtoken");
const JWT_SECRET=require("../config");
const { authmiddleware } = require("../middlewares");


//creating signup 
//zod validation and check db for dupes

const signupSchema= zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async (req,res)=>{
    const body=req.body;
    const {success}= signupSchema.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: body.username
    })

    if(user._Id){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);

//assigning random value out of 10k to every new user

    await Account.create({
        userId,
        balance: 1+Math.random()*10000
    })

    const token= jwt.sign({
        userId : dbUser._Id
    },JWT_SECRET)

    res.json({
        message: "User created successfully"
    })

})

//creating signin
//check db for existing and match email to password

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async(req,res)=>{
    const {success}=signinBody.safeParse(req.body)

    if(!success){
        return res.status(411).json={
            message: "Incorrect inputs"
        }
    }

    const user=awaqit.findOne({
        username:req.body.username,
        password:req.body.password
    });

    if(user){
        const token= jwt.sign({
            userId:user._Id
        },JWT_SECRET);

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message:"Error while logging in"
    })
})

//update user metadata
//update password,last name and first name(all optional)

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName:string().optional()
})

router.put("/",authmiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id:req.userId},req.body);

    res.json({
        message:"Updated successfully"
    })
})

//search other users from db for transactions
//using filter between last and first name using 'or'

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";

    const users= await User.find({
        $or: [{
            firstName: {
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _Id:user._Id
        }))
    })
})

module.exports = router;