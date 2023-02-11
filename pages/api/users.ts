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
  if (req.method === "POST") {
    const userId = req.body;

    try {
      console.log("I am dong");

      const deletedUser = await prisma.user.delete({ where: { id: userId } });
      console.log(deletedUser);

      if (!deletedUser) {
        throw new Error("Something went wrong");
      }
      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  }
}
