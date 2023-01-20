// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import short from "short-uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, subject, userId } = req.body;

    const joinCode = short.generate();

    const created = await prisma.classRoom.create({
      data: {
        name,
        subject,
        joinCode,
        teacher: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!created) {
      throw new Error("Some went wrong ");
    }

    res.status(201).json({ created });

    try {
    } catch (error) {
      console.log(error);
    }
  }
}
