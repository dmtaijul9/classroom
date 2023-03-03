// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { pairId } = req.query;

    const mark = req.body;

    try {
      const newPair = await prisma.quistionAnswer.update({
        where: {
          id: pairId,
        },
        data: {
          mark: mark,
        },
      });
      if (!newPair) {
        throw new Error("Somthe went wrong!");
      }
      res.status(200).json({
        message: "Success",
        pair: newPair,
      });
    } catch (err) {
      res.status(500).json({
        message: "Something is Wrong!",
      });
    }
  }
}
