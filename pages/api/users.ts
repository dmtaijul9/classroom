// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const allUsers = await prisma.user.findMany();

    if (!allUsers) {
      return res.status(401).json({ message: "Something is wrong!" });
    }

    return res.status(201).json({
      message: "Success",
      users: allUsers,
    });
  }
}
