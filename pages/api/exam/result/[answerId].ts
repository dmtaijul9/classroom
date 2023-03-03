// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { answerId } = req.query;

    try {
      const answerPaper = await prisma.answer.findUnique({
        where: {
          id: answerId,
        },
        include: {
          quiestionAnswer: true,
          student: true,
          Quiz: {
            include: {
              ClassRoom: true,
            },
          },
        },
      });

      if (!answerPaper) {
        throw new Error("Something is wrong!");
      }
      return res.status(200).json({
        message: "success",
        answerPaper: answerPaper,
      });
    } catch (err) {
      res.status(500).json({
        message: "Something is Wrong!",
      });
    }
  }
  if (req.method === "PUT") {
    const { answerId, result } = req.body;
    try {
      const answerPaper = await prisma.answer.update({
        where: {
          id: answerId,
        },
        data: {
          result,
        },
      });

      if (!answerPaper) {
        throw new Error("Something is wrong!");
      }
      return res.status(200).json({
        message: "success",
        answerPaper: answerPaper,
      });
    } catch (err) {
      res.status(500).json({
        message: "Something is Wrong!",
      });
    }
  }
}
