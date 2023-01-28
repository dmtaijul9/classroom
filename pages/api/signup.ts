// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method === "POST") {
    const { name, email, role, password } = req.body;

    try {
      if (
        name.trim() === "" ||
        email.trim() === "" ||
        role.trim() === "" ||
        password.trim() === ""
      ) {
        throw new Error("Field can not be empty!");
      }

      await bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw new Error("Password not salted !");
        }

        bcrypt.hash(password, salt, async (err, hashed) => {
          if (err) {
            throw new Error("Password not hashed!");
          }
          const variables = {
            name,
            email: email.toLowerCase(),
            password: hashed,
            role,
          };
          try {
            const createdUser = await prisma.user.create({ data: variables });
            console.log("Hello");
            console.log(createdUser);

            res.status(200).json({
              message: "Account created successfully!",
              user: createdUser,
            });
          } catch (error) {
            //@ts-ignore
            res.status(400).json({ message: error.message });
          }
        });
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
