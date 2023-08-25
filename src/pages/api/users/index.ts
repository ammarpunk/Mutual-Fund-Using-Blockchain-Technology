import connectDB from "backend/middlewares/connectDB";
import Investor from "backend/models/investor_model";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let investors;
    try {
      investors = await Investor.find({isAdmin: false}, "-password");
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Finding investors failed, please try again" });
    }

    if (!investors) {
      return res.status(401).send({ message: "Investors Not Found" });
    }

    res
      .status(201)
      .send(investors.map(investor => investor.toObject({ getters: true })));
  }
};

export default connectDB(handler);
