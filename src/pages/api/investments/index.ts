import connectDB from "backend/middlewares/connectDB";
import Investment from "backend/models/investment_model";
import Fund from "backend/models/fund_model";
import Investor from "backend/models/investor_model";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const investment = JSON.parse(req.body);

    const newInvestment = new Investment(investment);

    try {
      const fund = await Fund.findById(investment.fund);
      fund.investments.push(newInvestment)
      const investor = await Investor.findById(investment.investor);
      investor.investments.push(newInvestment)
      
      await newInvestment.save();
      await fund.save();
      await investor.save();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Creating investment failed, please try again" });
    }

    return res.status(201).send({ msg: "investment created" });
  } else if (req.method === "GET") {
    let investments;
    try {
      investments = await Investment.find()
        .populate("investor", "name")
        .populate("fund", "name");
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Getting investments failed, please try again" });
    }

    if (!investments) {
      return res.status(404).json({ message: "investments Not Found" });
    }

    return res
      .status(200)
      .send(
        investments.map(investment => investment.toObject({ getters: true }))
      );
  }
};

export default connectDB(handler);
