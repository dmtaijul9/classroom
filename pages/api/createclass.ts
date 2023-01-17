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

    console.log(name, subject, userId);
    const joinCode = short.generate();

    console.log(name);
    const created = await prisma.classRoom.create({
      data: { name, subject, userId, joinCode },
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
  res.status(200).json({ name: "John Doe" });
}
