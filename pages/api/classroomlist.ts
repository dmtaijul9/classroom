// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          ClassJoins: {
            include: {
              ClassRoom: true,
            },
          },
          ClassRoom: true,
        },
      });

      if (user?.role === "TEACHER") {
        return res.status(201).json({
          message: "Success",
          classroom: user?.ClassRoom,
        });
      }

      return res.status(201).json({
        message: "Success ",
        classroom: user?.ClassJoins,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
