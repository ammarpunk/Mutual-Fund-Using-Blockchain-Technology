import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "backend/middlewares/connectDB";
import Investor from "backend/models/investor_model"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password } = JSON.parse(req.body);

    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data." });
    }

    let existingInvestor;
    try {
      existingInvestor = await Investor.findOne({ email: email });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Signing up failed, please try again" });
    }

    if (existingInvestor) {
      return res.status(422).send({
        message: "Investor email exists already, please login instead.",
        input: "email"
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Signing up failed, please try again" });
    }

    const createdInvestor = new Investor({
      name,
      email,
      password: hashedPassword
    });

    try {
      await createdInvestor.save();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Signing up failed, please try again" });
    }

    let token;
    try {
      token = jwt.sign(
        {
          InvestorId: createdInvestor.id,
          email: createdInvestor.email,
          isAdmin: false
        },
        `${process.env.NEXT_PUBLIC_JWT_KEY}`,
        { expiresIn: "30d" }
      );
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Signing up failed, please try again" });
    }

    return res.status(201).json({ ...createdInvestor._doc, password: null, token })
  }
};

export default connectDB(handler);
