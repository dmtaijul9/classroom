// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { joinCode, userId } = req.body;

      const classRoom = await prisma.classRoom.findUnique({
        where: {
          joinCode,
        },
      });
      //if class does not exist
      if (!classRoom) {
        throw new Error("Invalid Join Code!");
      }

      //if exist but i am already a students

      const isAlreadyStudent = await prisma.classRoom.findUnique({
        where: {
          joinCode,
        },
        include: {
          students: {
            where: {
              userId,
            },
          },
        },
      });
      //@ts-ignore
      if (isAlreadyStudent?.students.length >= 1) {
        throw new Error("You are already a student!");
      }

      console.log(isAlreadyStudent);
      const joinedClass = await prisma.classRoom.update({
        where: {
          joinCode,
        },
        data: {
          students: {
            //@ts-ignore
            create: {
              userId,
            },
          },
        },
      });

      console.log(joinedClass);
      res.status(201).json({ message: "You are Joined!" });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}
