// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const allClasses = await prisma.classRoom.findMany();

      if (!allClasses) {
        throw new Error("Something went wrong ");
      }
      res.status(200).json({
        message: "Success",
        classroom: allClasses,
      });
    } catch (error) {
      res.status(403).json({
        message: "Something went wrong!",
      });
    }
  }
}
