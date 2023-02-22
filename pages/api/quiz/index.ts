// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method === "PATCH") {
    const { id } = req.body;
    try {
      await prisma.quiz.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      return res.status(402).json({ message: "Something went wrong!" });
    }
  }
}
