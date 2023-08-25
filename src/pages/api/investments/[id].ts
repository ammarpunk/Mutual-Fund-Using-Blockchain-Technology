import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "backend/middlewares/connectDB";
import Investment from "backend/models/investment_model"
import Fund from "backend/models/fund_model";
import Investor from "backend/models/investor_model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let investment;
    try {
      investment = await Investment.findById(req.query.id)
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Getting investment failed, please try again" });
    }

    if (!investment) {
      return res.status(404).json({ message: "investment Not Found" });
    }

    return res.status(200).send(investment.toObject({ getters: true }));
  } else if (req.method === "DELETE") {
    let investment;
    try {
      investment = await Investment.findById(req.query.id);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Getting investment failed, please try again" });
    }

    if (!investment) {
      return res.status(404).json({ message: "investment Not Found" });
    }

    try {
      const fund = await Fund.findById(investment.fund);
      fund.investments.pull(investment)
      const investor = await Investor.findById(investment.investor);
      investor.investments.pull(investment)
      
      await fund.save();
      await investor.save();
      await investment.remove();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Removing investment failed, please try again" });
    }

    return res.status(200).send(investment.toObject({ getters: true }));
  }
};

export default connectDB(handler);
