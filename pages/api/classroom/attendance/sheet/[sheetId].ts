// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { sheetId } = req.query;

    try {
      const sheet = await prisma.attendance.findUnique({
        where: {
          id: sheetId,
        },
        include: {
          students: {
            include: {
              User: true,
            },
          },
        },
      });

      if (!sheet) {
        throw new Error("Something went wrong");
      }
      res.status(200).json({
        message: "Success",
        sheet,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
  if (req.method === "POST") {
    const { sheetId } = req.query;

    try {
      const updatedSheet = await prisma.attendance.update({
        where: {
          id: sheetId,
        },
        data: {
          isAllow: false,
        },
      });
      if (!updatedSheet) {
        throw new Error("Something is wrong");
      }

      res.status(200).json({
        message: "Success",
        updatedSheet,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
}
