// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { examId } = req.query;

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

      if (!exam) {
        throw new Error("Something is wrong!");
      }

      const createdAt = new Date(exam.createdAt);

      if (createdAt.getTime() + 30 * 60 * 1000 <= new Date().getTime()) {
        res.status(200).json({
          message: "Time has been Expired!",
          exam,
        });
      } else {
        return res.status(200).json({
          message: "success",
          exam,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Something is Wrong!",
      });
    }
  }
}
