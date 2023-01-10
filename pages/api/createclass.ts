// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { toast } from "react-toastify";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, subject, userId } = req.body;

    console.log(name, subject, userId);

    console.log(name);
    const created = await prisma.classRoom.create({
      data: { name, subject, userId },
    });

    if (!created) {
      throw new Error("Some went wrong ");
    }
    toast.success("Classroom Created successfully");

    console.log(created);
    try {
    } catch (error) {
      console.log(error);
    }
  }
  res.status(200).json({ name: "John Doe" });
}
