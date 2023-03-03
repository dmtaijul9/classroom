// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { subject, studentId, noteText } = req.body;

    const variables = {
      subject,
      noteText: JSON.stringify(noteText),
      userId: studentId,
    };

    try {
      const newNote = await prisma.note.create({
        data: variables,
      });

      if (newNote) {
        return res.status(201).json({ message: " success", newNote });
      }
      throw new Error("Creating Failed !");
    } catch (error) {
      throw new Error("Creating Failed !");
    }
  } else if (req.method === "GET") {
    const { page, studentId } = req.query;

    try {
      const notes = await prisma.note.findMany({
        where: {
          userId: studentId,
        },
      });

      if (notes) {
        return res.status(201).json({
          message: "Success",
          notes,
        });
      }
      throw new Error("Something is wrong!");
    } catch (error) {
      res.status(501).json({
        message: "Something is wrong!",
      });
    }
  }
}
