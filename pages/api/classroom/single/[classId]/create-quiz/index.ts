// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { examName, questions, expireTime } = req.body;

    const { classId } = req.query;

    try {
      const response = await prisma.quiz.create({
        data: {
          ClassRoom: {
            connect: {
              id: classId,
            },
          },
          examName,

          expireTime: Number(expireTime),
          questions: {
            createMany: {
              data: [...questions],
            },
          },
        },
      });

      return res.status(200).json({
        message: "Success",
        question: response,
      });
    } catch (error) {
      res.status(400).json({
        message: "Something is wrong",
        error: error,
      });
    }
  }
}
