// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { examId } = req.query;
    console.log(examId);

    try {
      const exam = await prisma.quiz.findUnique({
        where: {
          id: examId,
        },
        include: {
          questions: true,
          answer: {
            include: {
              student: true,
            },
          },
          ClassRoom: true,
        },
      });
      console.log(exam);

      if (!exam) {
        throw new Error("Something is wrong!");
      }
      return res.status(200).json({
        message: "success",
        exam,
      });
    } catch (err) {
      res.status(500).json({
        message: "Something is Wrong!",
      });
    }
  }
}
