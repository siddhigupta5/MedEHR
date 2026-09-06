import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import generateToken from "../utils/generateToken.js";

const prisma = new PrismaClient();


// =============================
// REGISTER USER
// =============================

export const registerUser = async (req, res) => {

  try {

    const {
      fname,
      lname,
      email,
      password,
      role
    } = req.body;

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create new user
    const user = await prisma.user.create({

      data: {

        fname,
        lname,
        email,
        password: hashedPassword,
        role

      }

    });

    // Send response
    res.status(201).json({

      id: user.id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,

      token: generateToken(user.id)

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// =============================
// LOGIN USER
// =============================

export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // Find user
    const user = await prisma.user.findUnique({

      where: {
        email: email
      }

    });

    // Check user exists
    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    // Login success
    res.status(200).json({

      id: user.id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,

      token: generateToken(user.id)

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};