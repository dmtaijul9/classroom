import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const email = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        id: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not fond!" });
    }

    const token = jwt.sign({ user }, "SomeSecretKey", { expiresIn: "1h" });

    if (token) {
      return res.status(201).json({
        message: "Successfully sent!",
        resetLink: `http://localhost:3000/reset/${token}`,
      });
    }

    return res.status(401).json({ message: "Failed!" });
  }
}
