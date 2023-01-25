import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { newPassword, token, userId } = req.body;
    if (token) {
      jwt.verify(token, "SomeSecretKey", async (err, decodedToken) => {
        if (err) {
          return console.log(err);
        }

        await bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw new Error("Password not salted !");
          }
          bcrypt.hash(newPassword, salt, async (err, hashed) => {
            if (err) {
              throw new Error("Password not hashed!");
            }

            try {
              const updatedUser = await prisma.user.update({
                where: {
                  id: decodedToken.user.id,
                },
                data: {
                  password: hashed,
                },
              });
              res.status(200).json({
                message: "Account created successfully!",
                user: updatedUser,
              });
            } catch (error) {
              //@ts-ignore
              res.status(400).json({ message: error.message });
            }
          });
        });
      });
    } else {
      await bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw new Error("Password not salted !");
        }
        bcrypt.hash(newPassword, salt, async (err, hashed) => {
          if (err) {
            throw new Error("Password not hashed!");
          }

          try {
            const updatedUser = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                password: hashed,
              },
            });
            res.status(200).json({
              message: "Account created successfully!",
              user: updatedUser,
            });
          } catch (error) {
            //@ts-ignore
            res.status(400).json({ message: error.message });
          }
        });
      });
    }
  }
}
