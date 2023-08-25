import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "backend/middlewares/connectDB";
import Fund from "backend/models/fund_model"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    let updatedFund = JSON.parse(req.body);

    let fund;
    try {
      fund = await Fund.findByIdAndUpdate(req.query.id, updatedFund);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Getting fund failed, please try again" });
    }

    if (!fund) {
      return res.status(404).json({ message: "fund Not Found" });
    }

    try {
      await fund.save();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Updating fund failed, please try again" });
    }

    return res.status(200).send(fund.toObject({ getters: true }));
  } else if (req.method === "GET") {
    let fund;
    try {
      fund = await Fund.findById(req.query.id)
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Getting fund failed, please try again" });
    }

    if (!fund) {
      return res.status(404).json({ message: "Fund Not Found" });
    }

    return res.status(200).send(fund.toObject({ getters: true }));
  } else if (req.method === "DELETE") {
    let fund;
    try {
      fund = await Fund.findById(req.query.id);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Getting fund failed, please try again" });
    }

    if (!fund) {
      return res.status(404).json({ message: "Fund Not Found" });
    }

    try {
      await fund.remove();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Removing fund failed, please try again" });
    }

    return res.status(200).send(fund.toObject({ getters: true }));
  }
};

export default connectDB(handler);
