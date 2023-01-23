// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { noteId } = req.query;

    try {
      const deletedNote = await prisma.note.delete({ where: { id: noteId } });

      res.status(201).json({
        message: "Deleted Successfully!",
        deletedNote,
      });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  } else if (req.method === "GET") {
    const { noteId } = req.query;

    try {
      const note = await prisma.note.findUnique({
        where: {
          id: noteId,
        },
      });

      res.status(201).json({ message: "success", note });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }
}
