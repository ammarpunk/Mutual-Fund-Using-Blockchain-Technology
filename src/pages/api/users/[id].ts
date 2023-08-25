import connectDB from "backend/middlewares/connectDB";
import Investor from "backend/models/investor_model";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let user;
    try {
      user = await Investor.findById(req.query.id, "-password").populate({
        path: "investments",
        populate: { path: "fund" }
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Fetching user failed, please try again" });
    }

    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    res.json(user)
  } else if (req.method === "PATCH") {
    const { email, password, name } = JSON.parse(req.body);

    let user;
    try {
      user = await Investor.findById(req.query.id);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Fetching user failed, please try again" });
    }

    if (!user) {
      return res
        .status(404)
        .send({ message: "Fetching user failed, please try again" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }

    try {
      await user.save();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Could not update place, please try again" });
    }

    res.json({ success: true });
  } else if (req.method === "DELETE") {
    let user;
    try {
      user = await Investor.findById(req.query.id);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Finding user failed, please try later" });
    }

    if (!user) {
      return res.status(401).send({ message: "User Not Found" });
    }

    try {
      await user.remove();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Removing user failed, please try later" });
    }

    res.status(201).send({ message: "User removed" });
  }
};

export default connectDB(handler);
