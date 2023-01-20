// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { classroomId } = req.query;
    const { name, message } = req.body;

    try {
      const newComment = await prisma.comment.create({
        data: {
          name,
          message,
          ClassRoom: {
            connect: {
              id: classroomId,
            },
          },
        },
      });

      if (newComment) {
        res.status(201).json({
          message: "Comment created successfully!",
          comment: newComment,
        });
      } else {
        throw new Error("Somethis is wrong!");
      }
    } catch (error) {
      res.status(401).json({
        message: "Somethis is wrong!",
      });
    }
  }
}
