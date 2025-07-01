const express=require('express');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router=express.Router();

//check done to ensure enough amount for pending transaction
router.get("/balance",authMiddleware,async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });

    res.json({
        balance:account.balance
    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session= await mongoose.startSession();

    session.startTransaction();
    const{amount,to} = req.body;

    const account = await Account.findOne({userId:req.userId}).session(session);

    //checking existence of enough balance
    //checking existence of account
    //checking if amount value is positive(or else it can be used to steal)

    if(!account || account.balance<amount || account > 0) {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }


    const toAccount= await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    await Account.updateOne({userId: req.userId},{$inc: {balance:-amount}}).session(session);
    await Account.updateOne({userId: to},{$inc: {balance:amount}}).session(session);
    
    //committing transaction
    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    });
});

module.exports= router;
