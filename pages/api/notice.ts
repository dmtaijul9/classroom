// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log("Get");
    const { noticeId } = req.query;
    console.log(noticeId);

    try {
      const notice = await prisma.notification.findUnique({
        where: {
          id: noticeId,
        },
      });
      if (!notice) {
        throw new Error("SOmething went wrong!");
      }

      res.status(200).json({
        message: "Success",
        notice,
        noticeText: JSON.parse(notice.notice),
      });
    } catch (error) {
      res.status(404).json({
        message: "Notice is not available",
      });
    }

    return res.json({ message: "Hello" });
  }
}
