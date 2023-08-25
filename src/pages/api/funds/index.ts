import connectDB from "backend/middlewares/connectDB";
import Fund from "backend/models/fund_model"
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const fund = JSON.parse(req.body);

    const newFund = new Fund(fund);

    try {
      await newFund.save();
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .send({ message: "Creating fund failed, please try again" });
    }

    return res.status(201).send({ msg: "fund created" })
  } else if (req.method === "GET") {
    let funds;
    try {
      funds = await Fund.find();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Getting funds failed, please try again" });
    }

    if (!funds) {
      return res.status(404).json({ message: "funds Not Found" });
    }

    return res
      .status(200)
      .send(funds.map(fund => fund.toObject({ getters: true })));
  }
};

export default connectDB(handler);
