import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const protect = async (req, res, next) => {

  console.log("HEADERS:", req.headers);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id
        }
      });

      next();

    } catch (error) {

      console.log(error);

      return res.status(401).json({
        message: "Not authorized"
      });

    }

  }

  if (!token) {

    return res.status(401).json({
      message: "No token provided"
    });

  }

};

export default protect;