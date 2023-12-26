import { User } from "../models/user.models.js";

const splitEqually = async (req,res) => {
    const { email, amount, persons} = req.body;

    const isUserExist = await User.findOne({email})
    if(!isUserExist){
        res.status(404).send("User Does Not exist First Register or Log in")
    }
    if(!isUserExist.isLoggedIn){
        res.status(400).send("Log in First")
    }
    if(persons<=0)
    res.status(400).send("Persons can't be negative or zero")
    const noOfPersons = Number(persons);
    const totalAmount = Number(amount);

    const str = `Each Person should pay ${parseFloat(totalAmount/noOfPersons).toFixed(2)}`;

    const anotherStr = `Total Amount - ${amount}` + "\n" + `Persons - ${persons}` + "\n" + str ;

    
    await User.findByIdAndUpdate({_id : isUserExist._id},{
        $push:{history: anotherStr}
    })

    res.status(200).send(str);
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
    if(persons<=0 || arr.length==0)res.status(400).send("Persons can't be negative or zero")
   
    let totalAmount = Number(amount);
    let str = "";
    for(var i in arr){
        let p = Number(arr[i]);
        let temp = Number(i);
        let Payable = parseFloat((totalAmount*p)/100).toFixed(2);
        str += String(temp+1) + " person should pay " + String(Payable) + "\n"
    }
    const anotherStr = `Total Amount - ${amount}` + "\n" + `Persons - ${persons}` + "\n" + `Percentages : ${arr}`+ "\n" + str;
    await User.findByIdAndUpdate({_id : isUserExist._id},{
        $push:{history: anotherStr}
    })

    res.status(200).send(str)
}

const splitByExactAmount = async(req,res)=>{
    const { email, amount, persons, arr} = req.body;

    const isUserExist = await User.findOne({email})
    if(!isUserExist){
        res.status(404).send("User Does Not exist First Register or Log in")
    }
    if(!isUserExist.isLoggedIn){
        res.status(400).send("Log in First")
    }
    if(persons<=0 || arr.length==0)res.status(400).send("Persons can't be negative or zero")
   
    let totalAmount = Number(amount);
    console.log(totalAmount);
    let str = "";
    let anotheramount = 0;
    for(var i in arr){
        let p = Number(arr[i]);
        anotheramount += p;
        let temp = Number(i);
        str += String(temp+1) + " person should pay " + String(p) + "\n"
    }
    let remainingAmount = totalAmount-anotheramount;
    str += `Remaining amount is ${remainingAmount}`;
    const anotherStr = `Total Amount - ${amount}` + "\n" + `Persons - ${persons}` + "\n" + str;
    await User.findByIdAndUpdate({_id : isUserExist._id},{
        $push:{history: anotherStr}
    })

    res.status(200).send(str)
}

export {
    splitEqually,
    splitByPercentage,
    splitByExactAmount
}