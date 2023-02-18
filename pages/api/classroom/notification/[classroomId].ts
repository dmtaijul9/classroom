// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { classroomId } = req.query;
    const { notification } = req.body;

    try {
      const updatedNotification = await prisma.classRoom.update({
        where: {
          id: classroomId,
        },
        data: {
          notification: JSON.stringify(notification),
        },
      });

      if (updatedNotification) {
        res.status(201).json({
          message: "Updated Successfully!",
          classroom: updatedNotification,
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
