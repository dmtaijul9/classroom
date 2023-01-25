// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { classId } = req.query;

    try {
      const classRoom = await prisma.classRoom.findUnique({
        where: {
          id: classId,
        },
        include: {
          students: true,
          teacher: {
            select: {
              email: true,
              id: true,
              name: true,
              role: true,
            },
          },
          comments: true,
        },
      });

      return res.status(201).json({
        message: "Success",
        classroom: classRoom,
      });
    } catch (error) {
      res.status(501).json({
        message: "Something is wrong!",
      });
    }
  }
}
