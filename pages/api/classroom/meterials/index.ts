// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import prisma from "../../../../lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files, options });
      }
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }
  const data = await readFile(req, true);

  const { fileName, classId } = data?.fields;
  const { files }: any = data;

  const newFileData: any = await { ...files.meterial };

  const { newFilename, mimetype } = newFileData;

  if (!newFileData) {
    throw new Error("File not founds");
  }

  const filePath = `/images/${newFilename}`;

  try {
    const createdMeterial = await prisma.meterial.create({
      data: {
        fileName,
        filePath,
        fileType: mimetype,
        classRoomId: classId,
      },
    });

    if (createdMeterial) {
      return res.status(200).json({ message: "Successfully created" });
    }
    throw new Error("Something went wrong!");
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export default handler;
