import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "backend/middlewares/connectDB";
import Investor from "backend/models/investor_model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    
    const {email, password} = JSON.parse(req.body)

    if(!email || !password){
        return res.status(422).json({message: "Invalid inputs passed, please check your data."})
    }

    let existingInvestor
    try {
        existingInvestor = await Investor.findOne({email: email}, { investments: 0 })
    } catch (err) {
        return res.status(500).send({ message: 'Logging in failed, please try again'})
    }

    if(!existingInvestor){
        return res.status(401).send({ message: 'Investor does not exist, could not login.', input: "email"})
    }

    let isValidPassword = false
    try {
        isValidPassword = await bcrypt.compare(password, existingInvestor.password)
    }catch(err){
        return res.status(401).send({ message: 'Invalid credentials, could not login.'})
    }

    if(!isValidPassword){
        return res.status(401).send({ message: 'Invalid password, could not login.', input: "password"})
    }

    let token
    try {
        token = jwt.sign(
            {InvestorId: existingInvestor.id, email: existingInvestor.email},
            `${process.env.NEXT_PUBLIC_JWT_KEY}`,
            {expiresIn: '30d'})
    }catch(err){
        return res.status(500).send({ message: 'Logging in failed, please try again'})
    }

    return res.status(201).json({ ...existingInvestor._doc, password: null, token })
  }
};

export default connectDB(handler);