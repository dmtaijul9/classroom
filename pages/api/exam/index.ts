// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { quizId, userId, questionAnswer } = req.body;

    try {
      const answerShit = await prisma.answer.create({
        data: {
          quizId,
          userId,
          quiestionAnswer: {
            createMany: {
              data: [...questionAnswer],
            },
          },
        },
      });
      if (!answerShit) {
        throw new Error("Something went wrong!");
      }
      res.status(200).json({
        message: "success",
        answer: answerShit,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
}
