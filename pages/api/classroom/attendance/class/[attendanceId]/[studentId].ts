// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../lib/prisma";
import isEmpty from "../../../../../../utils/is-empty";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { attendanceId, studentId } = req.query;

    try {
      const isAllowAttendance = await prisma.attendance.findUnique({
        where: {
          id: attendanceId,
        },
        select: {
          isAllow: true,
          students: {
            include: {
              User: true,
            },
          },
        },
      });
      console.log(attendanceId, studentId);

      if (isAllowAttendance?.isAllow) {
        const isAlreadyDone = isAllowAttendance?.students.find((student) => {
          return student.userId === studentId;
        });

        if (isEmpty(isAlreadyDone)) {
          const updatedSheet = await prisma.attendance.update({
            where: {
              id: attendanceId,
            },
            data: {
              students: {
                //@ts-ignore
                create: {
                  userId: studentId,
                },
              },
            },
          });

          if (!updatedSheet) {
            throw new Error("Something went wrong");
          }
          return res.status(200).json({
            message: "Successfully attended",
          });
        }
        return res.status(200).json({
          message: "You have already attended in the class",
        });
      }
      return res.status(200).json({
        message: "Class has been closed",
      });
    } catch (err) {
      return res.status(403).json({
        message: "Something went wrong",
      });
    }
  }
}
