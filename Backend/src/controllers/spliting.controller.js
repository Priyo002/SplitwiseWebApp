import { json } from "express";
import { User } from "../models/user.models.js";

const splitEqual = async (req,res) => {
    const { email, amount, persons} = req.body;

    const isUserExist = await User.findOne({email})
    if(!isUserExist){
        res.status(404).send("User Does Not exist First Register or Log in")
    }
    if(!isUserExist.isLoggedIn){
        res.status(400).send("Log in First")
    }
    const noOfPersons = Number(persons);
    const totalAmount = Number(amount);

    if(persons>0) res.status(200).send(`Each Person should pay ${parseFloat(totalAmount/noOfPersons).toFixed(2)}`)
    else res.status(400).send("Persons can't be negative or zero")
}

const splitByPercentage = async (req,res) => {
    const { email, amount, persons, arr} = req.body;

    const isUserExist = await User.findOne({email})
    if(!isUserExist){
        res.status(404).send("User Does Not exist First Register or Log in")
    }
    if(!isUserExist.isLoggedIn){
        res.status(400).send("Log in First")
    }
    const totalAmount = Number(amount);
    let str = "";
    for(var i in arr){
        let p = Number(arr[i]);
        let temp = Number(i);
        str += String(temp+1) + " person should pay " + String(parseFloat((totalAmount*p)/100).toFixed(2)) + "\n"
    }

    if(persons>0) res.status(200).send(str)
    else res.status(400).send("Persons can't be negative or zero")
}

export {
    splitEqual,
    splitByPercentage
}