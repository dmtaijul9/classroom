// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { classId } = req.query;
    const { text } = req.body;

    try {
      const createdAttendance = await prisma.attendance.create({
        data: {
          topicName: text,
          classRoomId: classId,
        },
      });

      if (!createdAttendance) {
        throw new Error("Something went wrong");
      }
      return res.status(200).json({
        message: "Succes",
        attendance: createdAttendance,
      });
    } catch (error) {
      res.status(501).json({
        message: "Something is wrong!",
      });
    }
  }
}
